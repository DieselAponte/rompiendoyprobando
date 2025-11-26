import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DetalleSolicitudCompraDto } from '../../GestionProgramacion/models/DetalleSolicitudCompraDto';
import { SolicitudCompraDto } from '../../GestionProgramacion/models/SolicitudCompraDto';
import { OrdenCompraCreateDto } from '../models/OrdenCompraCreateDto';
import { OrdenCompraDetalleDto } from '../models/OrdenCompraDetalleDto';
import { OrdenCompraResumenDto } from '../models/OrdenCompraResumenDto';
import { ProductoProveedorCreateDto } from '../models/ProductoProveedorCreateDto';
import { ProductoProveedorDto } from '../models/ProductoProveedorDto';
import { ProductoProveedorUpdateDto } from '../models/ProductoProveedorUpdateDto';
import { ProveedorCreateDto } from '../models/ProveedorCreateDto';
import { ProveedorDto } from '../models/ProveedorDto';
import { ProveedorUpdateDto } from '../models/ProveedorUpdateDto';

interface ApiEnvelope<T> {
	success: boolean;
	message?: string;
	data?: T;
	idOrdenCompra?: number;
}

@Injectable({ providedIn: 'root' })
export class ComprasApiService {
	private readonly baseUrl = `${environment.apiUrl}/api/compras`;

	constructor(private readonly http: HttpClient) {}

	/**
	 * Fuente principal de `SolicitudesCompraTableComponent` y del flujo de cotización (pantalla
	 * CotizacionGeneracion). Devuelve `SolicitudCompraDto[]` con área, solicitante, estado y motivo
	 * para poblar la tabla y habilitar el botón "Cotizar".
	 */
	consultarSolicitudesPendientes(estado = 'PENDIENTE'): Observable<SolicitudCompraDto[]> {
		const params = new HttpParams().set('estado', estado);
		return this.http
			.get<ApiEnvelope<SolicitudCompraDto[]>>(`${this.baseUrl}/solicitudes`, { params })
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Alimenta el modal `PopupDetalleSolicitudDeCompraComponent` (en Programación) y la tabla
	 * `CotizacionProductosTableComponent` en Compras para mostrar cada producto con cantidades,
	 * condiciones y observaciones al iniciar la cotización.
	 */
	consultarDetalleSolicitud(idSolicitud: number): Observable<DetalleSolicitudCompraDto[]> {
		return this.http
			.get<ApiEnvelope<DetalleSolicitudCompraDto[]>>(`${this.baseUrl}/solicitudes/${idSolicitud}/detalles`)
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Usado por `PopupProveedorProductoComponent` + `ProveedoresProductosTableComponent` para listar
	 * proveedores y precios históricos de un producto en particular. Devuelve
	 * `ProductoProveedorDto[]` con proveedor, moneda y precio referencial.
	 */
	consultarCotizacionesDeProducto(idProducto: number): Observable<ProductoProveedorDto[]> {
		return this.http
			.get<ApiEnvelope<ProductoProveedorDto[]>>(`${this.baseUrl}/productos/${idProducto}/cotizaciones`)
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Invocado cuando `PopupProveedorProductoComponent` registra una nueva propuesta desde la tabla
	 * (acción de administración de proveedores). Retorna el `ProductoProveedorDto` persistido para
	 * refrescar la lista de cotizaciones.
	 */
	registrarCotizacion(dto: ProductoProveedorCreateDto): Observable<ProductoProveedorDto> {
		return this.http
			.post<ApiEnvelope<ProductoProveedorDto>>(`${this.baseUrl}/cotizaciones`, dto)
			.pipe(map((response) => response.data as ProductoProveedorDto));
	}

	/**
	 * Permite editar precios o condiciones ya registradas para un producto determinado. Afecta las
	 * vistas que muestran historiales de cotización antes de emitir una orden.
	 */
	actualizarCotizacion(dto: ProductoProveedorUpdateDto): Observable<ProductoProveedorDto> {
		return this.http
			.put<ApiEnvelope<ProductoProveedorDto>>(`${this.baseUrl}/cotizaciones`, dto)
			.pipe(map((response) => response.data as ProductoProveedorDto));
	}

	/**
	 * Ejecutado por `ComprasService.confirmarCotizacion` desde la pantalla de cotización. Envía la
	 * orden consolidada (`OrdenCompraCreateDto`) y recibe el ID generado para mostrar el resumen y
	 * alimentar la tabla `OrdenesCompraTableComponent`.
	 */
	registrarOrdenCompra(dto: OrdenCompraCreateDto): Observable<number> {
		return this.http
			.post<ApiEnvelope<unknown>>(`${this.baseUrl}/ordenes-compra`, dto)
			.pipe(map((response) => Number(response.idOrdenCompra)));
	}

	/**
	 * Suministra los datos del histórico (`OrdenesCompraTableComponent`) y del overlay
	 * `PopupResumenHistorialComponent` una vez que se implemente. Devuelve idOrden, proveedor,
	 * monto y estado para cada registro.
	 */
	listarOrdenesCompra(): Observable<OrdenCompraResumenDto[]> {
		return this.http
			.get<ApiEnvelope<OrdenCompraResumenDto[]>>(`${this.baseUrl}/ordenes-compra`)
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Usado por la acción "Ver Detalle" (tabla de órdenes) y futuros overlays/resúmenes para mostrar
	 * líneas de producto, impuestos y proveedor asignado. Entrega `OrdenCompraDetalleDto` completo.
	 */
	obtenerDetalleOrdenCompra(idOrden: number): Observable<OrdenCompraDetalleDto> {
		return this.http
			.get<ApiEnvelope<OrdenCompraDetalleDto>>(`${this.baseUrl}/ordenes-compra/${idOrden}`)
			.pipe(map((response) => response.data as OrdenCompraDetalleDto));
	}

	/**
	 * Entrada para `ProveedoresTableComponent` (gestión de catálogo) y para los dropdowns de los
	 * formularios. Devuelve `ProveedorDto[]` con nombre, RUC, contacto y estado.
	 */
	listarProveedores(): Observable<ProveedorDto[]> {
		return this.http
			.get<ApiEnvelope<ProveedorDto[]>>(`${this.baseUrl}/proveedores`)
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Requerido cuando `PopupProveedorFormComponent` abre en modo edición; permite prellenar el
	 * formulario con la data del proveedor seleccionado.
	 */
	consultarProveedorPorId(id: number): Observable<ProveedorDto> {
		return this.http
			.get<ApiEnvelope<ProveedorDto>>(`${this.baseUrl}/proveedores/${id}`)
			.pipe(map((response) => response.data as ProveedorDto));
	}

	/**
	 * Usado como validación/prellenado cuando se ingresa un RUC en la UI (evita duplicados) y puede
	 * integrarse con búsquedas de proveedores externos.
	 */
	consultarProveedorPorRuc(ruc: string): Observable<ProveedorDto> {
		return this.http
			.get<ApiEnvelope<ProveedorDto>>(`${this.baseUrl}/proveedores/ruc/${ruc}`)
			.pipe(map((response) => response.data as ProveedorDto));
	}

	/**
	 * Acción principal del formulario `PopupProveedorFormComponent` en modo creación. Persiste la
	 * ficha del proveedor y devuelve el registro para insertarlo en la tabla.
	 */
	registrarProveedor(dto: ProveedorCreateDto): Observable<ProveedorDto> {
		return this.http
			.post<ApiEnvelope<ProveedorDto>>(`${this.baseUrl}/proveedores`, dto)
			.pipe(map((response) => response.data as ProveedorDto));
	}

	/**
	 * Utilizado por el mismo formulario anterior en modo edición; espera el ID en la ruta y el DTO con
	 * los campos editables (sin RUC). Retorna el proveedor actualizado.
	 */
	actualizarProveedor(id: number, dto: ProveedorUpdateDto): Observable<ProveedorDto> {
		return this.http
			.put<ApiEnvelope<ProveedorDto>>(`${this.baseUrl}/proveedores/${id}`, dto)
			.pipe(map((response) => response.data as ProveedorDto));
	}

	/**
	 * Respaldado por `PopupConfirmacionEliminacionComponent` desde la tabla de proveedores. Debe
	 * realizar un borrado lógico/físico y responder éxito para refrescar la lista.
	 */
	eliminarProveedor(id: number): Observable<void> {
		return this.http
			.delete<ApiEnvelope<unknown>>(`${this.baseUrl}/proveedores/${id}`)
			.pipe(map(() => undefined));
	}
}

/*
 * Backend/endpoint pendientes detectados en los componentes provistos:
 *
 * - `PopupResumenHistorialComponent`: actualmente es un stub. Requiere un endpoint
 *   `/ordenes-compra/{id}/resumen-historial` o reutilizar `obtenerDetalleOrdenCompra` añadiendo
 *   campos agregados (totales, historial de estado) para que el popup muestre información útil.
 *
 * - Gestión de cotizaciones por producto: la pantalla de cotización necesita persistir el proveedor
 *   seleccionado por línea antes de generar la OC. Si el backend aún no expone un batch update de
 *   cotizaciones, se sugiere añadir `POST /cotizaciones/batch` que reciba el conjunto de líneas para
 *   evitar múltiples llamadas secuenciales.
 *
 * - Validación de RUC duplicado: aunque existe `consultarProveedorPorRuc`, se recomienda que el
 *   backend devuelva un código de error semántico (409) cuando se quiera registrar un proveedor con
 *   RUC ya existente, de forma que `PopupProveedorFormComponent` pueda mostrar el mensaje adecuado.
 */
