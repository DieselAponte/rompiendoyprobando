import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ProductoCotizacion } from '../../../core/models/producto.model';
import { SolicitudCompraResumenDto } from '../models/SolicitudCompraResumenDto';
import { ProductoProveedorDto } from '../models/ProductoProveedorDto';
import { OrdenCompraResumenDto } from '../models/OrdenCompraResumenDto';
import { OrdenCompraDetalleDto } from '../models/OrdenCompraDetalleDto';
import { DetalleOrdenCompraCreateDto } from '../models/DetalleOrdenCompraCreateDto';
import { OrdenCompraCreateDto } from '../models/OrdenCompraCreateDto';
import { ComprasApiService } from '../api/compras-api.service';
import { SolicitudCompraDto } from '../../GestionProgramacion/models/SolicitudCompraDto';
import { DetalleSolicitudCompraDto } from '../../GestionProgramacion/models/DetalleSolicitudCompraDto';

const IGV_RATE = 0.18;

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  constructor(private readonly api: ComprasApiService) {}

  /**
   * Obtiene la lista de solicitudes de compra pendientes.
   */
  getSolicitudesPendientes(): Observable<SolicitudCompraResumenDto[]> {
    return this.api
      .consultarSolicitudesPendientes()
      .pipe(
        map((solicitudes) => solicitudes.map((solicitud) => this.mapSolicitudResumen(solicitud))),
        catchError(() => of([]))
      );
  }

  /**
   * Obtiene los productos específicos de una solicitud listos para ser cotizados.
   * Usado en: CotizacionGeneracionComponent
   * @param idSolicitud El ID de la solicitud a cotizar.
   */
  getProductosBySolicitudId(idSolicitud: number): Observable<ProductoCotizacion[]> {
    return this.api
      .consultarDetalleSolicitud(idSolicitud)
      .pipe(
        map((detalles) => detalles.map((detalle) => this.mapDetalleToProducto(detalle))),
        catchError(() => of([]))
      );
  }

  /**
   * Obtiene los proveedores disponibles para un ID de producto específico.
   * @param productoId El ID del producto a cotizar.
   */
  getProveedoresByProductoId(productoId: number): Observable<ProductoProveedorDto[]> {
    return this.api
      .consultarCotizacionesDeProducto(productoId)
      .pipe(catchError(() => of([])));
  }


  /**
   * Confirma la cotización y genera la Orden de Compra (OC).
   * Usado en: CotizacionGeneracionComponent (botón Confirmar Compra)
   * @param idSolicitud El ID de la solicitud.
   * @param productos Lista final de productos cotizados.
   * @param justificacion La justificación del usuario.
   */
  confirmarCotizacion(
    idSolicitud: number, 
    productos: ProductoCotizacion[], 
    justificacion: string
  ): Observable<OrdenCompraResumenDto> {
    const productosValidados = productos.filter((producto) => this.productoTieneCotizacion(producto));

    if (!productosValidados.length) {
      return throwError(() => new Error('Debe seleccionar proveedor y precio para al menos un producto.'));
    }

    const detalles = productosValidados.map((producto) => this.mapProductoToDetalle(producto));
    const proveedorPrincipal = productosValidados[0].idProveedorSeleccionado!;
    const montoTotal = this.calcularMontoConIgv(productosValidados);

    const dto: OrdenCompraCreateDto = {
      idSolicitud,
      idProveedor: proveedorPrincipal,
      numeroOrden: this.generarNumeroOrden(),
      fechaEntregaEstimada: this.fechaHoyISO(),
      observaciones: justificacion,
      detalles,
    };

    return this.api.registrarOrdenCompra(dto).pipe(
      map((idOrdenCompra) => ({
        idOrden: idOrdenCompra,
        idSolicitud,
        proveedorPrincipal: productosValidados[0].nombreProveedorSeleccionado || 'Proveedor seleccionado',
        fechaGeneracion: new Date().toISOString(),
        montoTotal,
        estadoOC: 'Generada',
      }))
    );
  }



  getOrdenesHistoricas(): Observable<OrdenCompraResumenDto[]> {
    return this.api
      .listarOrdenesCompra()
      .pipe(catchError(() => of([])));
  }

  getDetalleOrdenCompra(idOrden: number): Observable<OrdenCompraDetalleDto> {
    return this.api.obtenerDetalleOrdenCompra(idOrden);
  }
  // 💡 Implementar funciones como getProductosBySolicitudId(), saveCotizacion(), etc.

  private mapSolicitudResumen(dto: SolicitudCompraDto): SolicitudCompraResumenDto {
    type SolicitudCompraBackendDto = SolicitudCompraDto & {
      area?: string;
      solicitante?: string;
      motivo?: string;
    };

    const extended = dto as SolicitudCompraBackendDto;

    return {
      idSolicitud: dto.id,
      area: extended.area ?? 'Sin área',
      solicitante: extended.solicitante ?? `Req ${dto.idRequerimientoId}`,
      fechaCreacion: dto.fechaSolicitud,
      estado: this.normalizeEstado(dto.estado),
      motivo: extended.motivo ?? '',
    };
  }

  private normalizeEstado(raw?: string): SolicitudCompraResumenDto['estado'] {
    switch ((raw || 'PENDIENTE').toUpperCase()) {
      case 'APROBADA':
        return 'Aprobada';
      case 'RECHAZADA':
        return 'Rechazada';
      case 'EN_COTIZACION':
      case 'EN COTIZACION':
      case 'EN_PROCESO':
      case 'EN PROCESO':
        return 'En Cotización';
      default:
        return 'Pendiente';
    }
  }

  private mapDetalleToProducto(detalle: DetalleSolicitudCompraDto): ProductoCotizacion {
    const proveedorSeleccionado = detalle.idProveedorSeleccionado;
    const precio = detalle.precioReferencial ?? null;
    const subtotal = precio != null ? precio * detalle.cantidadSolicitada : null;

    return {
      idProducto: detalle.idProducto.id,
      nombreProducto: detalle.idProducto.nombreProducto,
      cantidadSolicitada: detalle.cantidadSolicitada,
      idDetalleSolicitud: detalle.id,
      idProveedorSeleccionado: proveedorSeleccionado?.id ?? null,
      nombreProveedorSeleccionado: proveedorSeleccionado?.nombreProveedor ?? null,
      precioUnitarioReferencial: precio,
      subtotal,
    };
  }

  private productoTieneCotizacion(producto: ProductoCotizacion): boolean {
    return (
      !!producto.idDetalleSolicitud &&
      producto.idProveedorSeleccionado !== null &&
      producto.precioUnitarioReferencial !== null &&
      producto.precioUnitarioReferencial > 0
    );
  }

  private mapProductoToDetalle(producto: ProductoCotizacion): DetalleOrdenCompraCreateDto {
    if (!producto.idDetalleSolicitud || producto.precioUnitarioReferencial == null) {
      throw new Error('El producto no tiene información suficiente para registrar la orden.');
    }

    return {
      idDetalleSolicitud: producto.idDetalleSolicitud,
      idProducto: producto.idProducto,
      cantidad: producto.cantidadSolicitada,
      precioUnitario: producto.precioUnitarioReferencial,
    };
  }

  private calcularMontoConIgv(productos: ProductoCotizacion[]): number {
    const subtotal = productos.reduce((sum, producto) => {
      if (!producto.precioUnitarioReferencial) {
        return sum;
      }
      return sum + producto.precioUnitarioReferencial * producto.cantidadSolicitada;
    }, 0);

    return subtotal * (1 + IGV_RATE);
  }

  private generarNumeroOrden(): string {
    return `OC-${Date.now()}`;
  }

  private fechaHoyISO(): string {
    return new Date().toISOString().split('T')[0];
  }
}
  
