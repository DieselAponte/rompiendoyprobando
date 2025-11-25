import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, throwError, switchMap } from 'rxjs';
import { DistribucionApiService } from '../api/distribucion-api.service';
import { DetalleOrdenDistribucion } from '../models/DetalleOrdenDistribucionAsignacion.model';
import { DetalleOrdenDistribucionDto } from '../models/DetalleOrdenDistribucionDto';
import { DetalleTransporteDto } from '../models/DetalleTransporteDto';
import { IncidenciaTransporteDto } from '../models/IncidenciaTransporteDto';
import { OrdenDistribucion, OrdenDistribucionDto } from '../models/OrdenDistribucionDto';
import { SeguimientoVehiculo, SeguimientoVehiculoDto } from '../models/SeguimientoVehiculoDto';
import { Vehiculo, VehiculoDto } from '../models/VehiculoDto';
import { LoteProducto } from '../models/lote-producto-info.model';
import { DetalleOrdenCompleta } from '../models/incidenciasModels/detalleReporteCompleto.model';
import { IncidenciaReporte } from '../models/incidenciasModels/incidenciaReporte.model';
import { OrdenReporte } from '../models/incidenciasModels/ordenReporte.model';

@Injectable({
  providedIn: 'root',
})
export class DistribucionService {
  private readonly estadosDefaultConsulta = ['PENDIENTE', 'PROGRAMADA', 'EN_RUTA'];

  constructor(private readonly distribucionApi: DistribucionApiService) {}


  /**
   * Obtiene la lista principal de órdenes de distribución.
   * Usado en: ordenes-distribucion-list
   */
  getOrdenesDistribucion(estado?: string): Observable<OrdenDistribucion[]> {
    const source$ = estado
      ? this.distribucionApi.consultarOrdenesDistribucion(estado)
      : this.obtenerOrdenesPorEstados(this.estadosDefaultConsulta);

    return source$.pipe(map((ordenes) => ordenes.map((orden) => this.mapOrdenDistribucion(orden))));
  }

  /**
   * Obtiene los detalles (lotes) de una orden y las opciones de vehículos
   * que son compatibles con la condición de transporte requerida.
   * Usado en: PopupLoteAsignacionVehiculoComponent
   */
  getDetallesOrdenParaAsignacion(idOrden: number): Observable<DetalleOrdenDistribucion[]> {
    return forkJoin({
      detalles: this.distribucionApi.consultarDetallesOrden(idOrden),
      vehiculos: this.distribucionApi.consultarVehiculosDisponibles(),
    }).pipe(
      map(({ detalles, vehiculos }) =>
        detalles.map((detalle) => this.mapDetalleAsignacion(detalle, vehiculos))
      )
    );
  }

  /**
   * Guarda las asignaciones de vehículos a los lotes y actualiza el estado de la orden.
   *
   * Backend requerido:
   *  1. Exponer un endpoint (ej. POST /api/distribucion/ordenes/{idOrden}/asignaciones) que reciba
   *     la orden, el id del seguimiento a crear y el arreglo de lotes con idVehiculoAsignado.
   *  2. Validar disponibilidad/capacidad del vehículo contra el lote antes de persistir.
   *  3. Persistir la asignación creando el SeguimientoVehiculo y los DetalleTransporte asociados
   *     en una transacción; retornar el SeguimientoVehiculoDto actualizado.
   *  4. Responder con envelope { success, message, data } para alinear con DistribucionApiService.
   * Una vez disponible, reemplazar este throw por la llamada HTTP y refrescar la tabla.
   */
  guardarAsignacionVehiculos(idOrden: number, detalles: DetalleOrdenDistribucion[]): Observable<void> {
    return throwError(() => new Error(`Asignación de vehículos para la orden ${idOrden} no implementada en el backend actual.`));
  }
  

  

  // ... (getOrdenesDistribucion, getDetallesOrdenParaAsignacion, guardarAsignacionVehiculos sin cambios) ...

  /**
   * Obtiene el listado de vehículos que están actualmente en seguimiento (en ruta).
   * Usado en: MonitoreoVehiculosListComponent
   */
  getSeguimientoVehiculos(): Observable<SeguimientoVehiculo[]> {
      return this.distribucionApi.consultarVehiculosEnCamino().pipe(
        map((seguimientos) => seguimientos.map((seguimiento) => this.mapSeguimiento(seguimiento)))
      );
  }
  
  /**
   * Obtiene los lotes que están siendo transportados en un seguimiento específico.
   * Usado en: VehiculoLotesListComponent
   */
  getLotesBySeguimientoId(idSeguimiento: number): Observable<DetalleTransporteDto[]> {
      return this.distribucionApi.consultarLotesDelVehiculo(idSeguimiento).pipe(
        map((detalles) => detalles.map((detalle) => ({
          ...detalle,
          nombreProducto: detalle.nombreProducto ?? `Lote #${detalle.idLote}`,
        })))
      );
  }
  
  /**
   * Obtiene la información detallada de un lote específico.
   * Usado en: PopupInfoLoteComponent
    *
    * Backend requerido:
    *  1. Endpoint GET /api/almacenamiento/lotes/{idLote} (o similar) que devuelva LoteProductoDto
    *     con cantidades actuales y metadatos de trazabilidad.
    *  2. El servicio debería exponer la información de producto/condición para que la UI pueda
    *     validar compatibilidad con transporte.
    *  3. Formato de respuesta debe usar ApiEnvelope para mapearse directamente desde
    *     DistribucionApiService.
   */
      getInfoLote(idLote: number): Observable<LoteProducto> {
        return throwError(() => new Error(`Consulta de información detallada del lote ${idLote} no implementada.`));
  }
  
  /**
   * Obtiene la información detallada de un vehículo (placa, capacidad, etc.).
   * Usado en: MonitoreoVehiculosListComponent (acción 'Info Vehiculo')
   */
  getInfoVehiculo(idVehiculo: number): Observable<Vehiculo> {
      return this.distribucionApi.consultarVehiculosDisponibles().pipe(
        map((vehiculos) => {
          const vehiculo = vehiculos.find((v) => v.id === idVehiculo);
          if (!vehiculo) {
            throw new Error(`Vehículo con ID ${idVehiculo} no disponible.`);
          }
          return this.mapVehiculoLegacy(vehiculo);
        })
      );
  }

  /**
   * Confirma la entrega física de la orden y actualiza el estado del seguimiento.
   * Backend requerido:
   *  1. Endpoint POST /api/distribucion/ordenes/{idOrden}/confirmacion-entrega que invoque
   *     ServiceActualizarOrdenDistribucion para cerrar el seguimiento y marcar la orden como ENTREGADA.
   *  2. Debe registrar usuario/fecha de confirmación y devolver estado actualizado para refrescar UI.
   *  3. Responder ApiEnvelope<void | OrdenDistribucionDto> para alinear estructura.
   */
  confirmarEntrega(idOrden: number): Observable<void> {
    return throwError(() => new Error(`Confirmación de entrega para la orden ${idOrden} no implementada.`));
  }

  /**
   * Cancela una orden programada o en ruta.
   * Backend requerido:
   *  1. Endpoint POST /api/distribucion/ordenes/{idOrden}/cancelacion que valide estado actual.
   *  2. Debe revertir asignaciones de vehículo y liberar lotes dependiendo de la política.
   *  3. Responder ApiEnvelope<void> y propagar mensaje para notificar en UI.
   */
  cancelarOrden(idOrden: number): Observable<void> {
    return throwError(() => new Error(`Cancelación para la orden ${idOrden} no implementada.`));
  }

  /**
   * Ensambla el reporte detallado mezclando información de orden, lotes y seguimiento.
   * Backend requerido:
   *  1. Endpoint dedicado (GET /api/distribucion/ordenes/{idOrden}/reporte) que ya relacione
   *     OrdenDistribucionDto + SeguimientoVehiculoDto + DetalleOrdenDistribucionDto.
   *  2. El backend debe incluir justificación de cierre y métricas de performance.
   *  3. Con ese endpoint, este método se reduce a una única llamada HTTP.
   */
  getDetalleReporteOrden(idOrden: number): Observable<DetalleOrdenCompleta> {
      return forkJoin({
        ordenes: this.obtenerOrdenesPorEstados(['PENDIENTE', 'PROGRAMADA', 'EN_RUTA', 'ENTREGADA']),
        detalles: this.distribucionApi.consultarDetallesOrden(idOrden),
        seguimientos: this.distribucionApi.consultarVehiculosEnCamino(),
      }).pipe(
        map(({ ordenes, detalles, seguimientos }) => {
          const orden = ordenes.find((o) => (o.idOrden ?? o.id) === idOrden);
          if (!orden) {
            throw new Error(`Orden #${idOrden} no encontrada para reporte.`);
          }

          const seguimiento = seguimientos.find((s) => s.idOrdenDistId === idOrden);
          if (!seguimiento) {
            throw new Error(`Seguimiento para la orden #${idOrden} no disponible.`);
          }
          return {
            orden: {
              ...this.mapOrdenDistribucion(orden),
              totalLotes: detalles.length,
              tieneIncidencias: false,
            },
            detallesLotes: detalles.map((detalle) => this.mapDetalleAsignacion(detalle, [])),
            infoSeguimiento: this.mapSeguimiento(seguimiento),
            justificacionCierre: 'Detalle de cierre no disponible.',
          } as DetalleOrdenCompleta;
        })
      );
  }
  /**
   * Obtiene la lista de incidencias para una orden específica.
   * Usado en: IncidenciasReporteComponent
    *
    * Limitación actual: no existe endpoint /ordenes/{idOrden}/incidencias, por lo que derivamos
    * las incidencias consultando cada vehículo en ruta y filtrando en el front. El backend debería
    * proporcionar un servicio directo que ya relacione idOrdenDist, detalle y vehículo para evitar
    * múltiples round-trips.
   */
  getIncidenciasByOrdenId(idOrden: number): Observable<IncidenciaReporte[]> {
    return this.distribucionApi.consultarVehiculosEnCamino().pipe(
      map((seguimientos) =>
        seguimientos
          .filter((seguimiento) => seguimiento.idOrdenDistId === idOrden)
          .map((seguimiento) => seguimiento.idVehiculo.id)
      ),
      switchMap((vehiculosIds) => {
        if (!vehiculosIds.length) {
          return of([]);
        }
        const solicitudes = vehiculosIds.map((idVehiculo) =>
          this.distribucionApi.consultarIncidenciasPorVehiculo(idVehiculo)
        );
        return forkJoin(solicitudes).pipe(
          map((respuestas) => respuestas.flat()),
          map((incidencias) =>
            incidencias
              .filter((incidencia) => incidencia.idOrdenDist === idOrden)
              .map((incidencia) => this.mapIncidenciaReporte(incidencia))
          )
        );
      })
    );
  }

  /**
   * Obtiene la lista de órdenes entregadas para el reporte.
   * Usado en: ReportesEntregaListComponent
    *
    * Nota sobre `tieneIncidencias`: actualmente se setea en false porque no existe un API que
    * devuelva el flag precalculado. El backend debería exponer un campo agregado o un endpoint
    * /ordenes/{id}/incidencias/resumen que indique si la orden tuvo incidencias para poblar la tabla
    * sin consultas adicionales.
   */
  getReporteOrdenesEntregadas(): Observable<OrdenReporte[]> {
    return this.distribucionApi.consultarOrdenesDistribucion('ENTREGADA').pipe(
      switchMap((ordenes) => {
        if (!ordenes.length) {
          return of([] as OrdenReporte[]);
        }

        const solicitudes = ordenes.map((orden) =>
          this.distribucionApi.consultarDetallesOrden(orden.id).pipe(
            map((detalles) => ({ orden, detalles }))
          )
        );

        return forkJoin(solicitudes).pipe(
          map((resultados) =>
            resultados.map(({ orden, detalles }) => ({
              ...this.mapOrdenDistribucion(orden),
              totalLotes: detalles.length,
              tieneIncidencias: false,
            }))
          )
        );
      })
    );
  }

  private obtenerOrdenesPorEstados(estados: string[]): Observable<OrdenDistribucionDto[]> {
    if (!estados.length) {
      return of([]);
    }
    const solicitudes = estados.map((estado) => this.distribucionApi.consultarOrdenesDistribucion(estado));
    return forkJoin(solicitudes).pipe(map((respuestas) => respuestas.flat()));
  }

  private mapOrdenDistribucion(dto: OrdenDistribucionDto): OrdenDistribucion {
    return {
      ...dto,
      idOrden: dto.idOrden ?? dto.id,
      fechaEntregaEstimada: dto.fechaEntregaEstimada ?? dto.fechaDistribucion,
      nombreUsuario: dto.nombreUsuario ?? 'Sin asignar',
      area: dto.area ?? 'Sin área',
    };
  }

  private mapDetalleAsignacion(
    detalle: DetalleOrdenDistribucionDto,
    vehiculos: VehiculoDto[]
  ): DetalleOrdenDistribucion {
    return {
      idLote: this.resolveLoteId(detalle.idLote),
      nombreProducto: this.resolveProductoNombre(detalle.idProducto),
      cantidadProducto: detalle.cantidad,
      condicionTransporteRequerida: this.resolveCondicion(detalle.idProducto),
      idVehiculoAsignado: null,
      opcionesVehiculo: vehiculos.map((vehiculo) => this.mapVehiculoLegacy(vehiculo)),
    };
  }

  private resolveLoteId(idLote: number | { id: number }): number {
    return typeof idLote === 'number' ? idLote : idLote.id;
  }

  private resolveProductoNombre(idProducto: number | { nombreProducto?: string; id: number }): string {
    if (typeof idProducto === 'number') {
      return `Producto #${idProducto}`;
    }
    return idProducto.nombreProducto ?? `Producto #${idProducto.id}`;
  }

  private resolveCondicion(idProducto: number | { condicionesAlmacenamiento?: string }): string {
    if (typeof idProducto === 'number') {
      return 'No especificado';
    }
    return idProducto.condicionesAlmacenamiento ?? 'No especificado';
  }

  private mapVehiculoLegacy(vehiculo: VehiculoDto): Vehiculo {
    return {
      ...vehiculo,
      idVehiculo: vehiculo.id,
      disponible: vehiculo.estado ? vehiculo.estado === 'Disponible' : undefined,
    };
  }

  private mapSeguimiento(dto: SeguimientoVehiculoDto): SeguimientoVehiculo {
    return {
      ...dto,
      idSeguimiento: dto.id,
      idOrden: dto.idOrden ?? dto.idOrdenDistId,
      idVehiculoLegacy: dto.idVehiculo.id,
      placaVehiculo: dto.placaVehiculo ?? dto.idVehiculo.placa,
    } as SeguimientoVehiculo;
  }

  private mapIncidenciaReporte(dto: IncidenciaTransporteDto): IncidenciaReporte {
    return {
      idIncidencia: dto.id,
      idOrden: dto.idOrdenDist,
      idVehiculo: dto.idVehiculo,
      idDetalleDist: dto.idDetalleDist ?? null,
      tipoIncidencia: dto.tipoIncidencia,
      descripcion: dto.descripcion,
      impacto: (dto.impacto as IncidenciaReporte['impacto']) ?? 'Bajo',
      fechaReporte: dto.fechaReporte,
      usuarioReporta: dto.usuarioReporta ?? 'Sistema',
    };
  }
}
