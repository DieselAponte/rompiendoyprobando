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
	 * Recupera las solicitudes de compra según el estado que exige la pantalla de listado.
	 */
	consultarSolicitudesPendientes(estado = 'PENDIENTE'): Observable<SolicitudCompraDto[]> {
		const params = new HttpParams().set('estado', estado);
		return this.http
			.get<ApiEnvelope<SolicitudCompraDto[]>>(`${this.baseUrl}/solicitudes`, { params })
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Obtiene el detalle de productos asociados a una solicitud seleccionada en la tabla.
	 */
	consultarDetalleSolicitud(idSolicitud: number): Observable<DetalleSolicitudCompraDto[]> {
		return this.http
			.get<ApiEnvelope<DetalleSolicitudCompraDto[]>>(`${this.baseUrl}/solicitudes/${idSolicitud}/detalles`)
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Lista las cotizaciones existentes para un producto.
	 */
	consultarCotizacionesDeProducto(idProducto: number): Observable<ProductoProveedorDto[]> {
		return this.http
			.get<ApiEnvelope<ProductoProveedorDto[]>>(`${this.baseUrl}/productos/${idProducto}/cotizaciones`)
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Registra una nueva cotización producto-proveedor.
	 */
	registrarCotizacion(dto: ProductoProveedorCreateDto): Observable<ProductoProveedorDto> {
		return this.http
			.post<ApiEnvelope<ProductoProveedorDto>>(`${this.baseUrl}/cotizaciones`, dto)
			.pipe(map((response) => response.data as ProductoProveedorDto));
	}

	/**
	 * Actualiza una cotización existente.
	 */
	actualizarCotizacion(dto: ProductoProveedorUpdateDto): Observable<ProductoProveedorDto> {
		return this.http
			.put<ApiEnvelope<ProductoProveedorDto>>(`${this.baseUrl}/cotizaciones`, dto)
			.pipe(map((response) => response.data as ProductoProveedorDto));
	}

	/**
	 * Registra formalmente una orden de compra y devuelve su ID generado.
	 */
	registrarOrdenCompra(dto: OrdenCompraCreateDto): Observable<number> {
		return this.http
			.post<ApiEnvelope<unknown>>(`${this.baseUrl}/ordenes-compra`, dto)
			.pipe(map((response) => Number(response.idOrdenCompra)));
	}

	/**
	 * Lista las órdenes de compra existentes (historial/resumen).
	 */
	listarOrdenesCompra(): Observable<OrdenCompraResumenDto[]> {
		return this.http
			.get<ApiEnvelope<OrdenCompraResumenDto[]>>(`${this.baseUrl}/ordenes-compra`)
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Obtiene el detalle completo de una orden de compra específica.
	 */
	obtenerDetalleOrdenCompra(idOrden: number): Observable<OrdenCompraDetalleDto> {
		return this.http
			.get<ApiEnvelope<OrdenCompraDetalleDto>>(`${this.baseUrl}/ordenes-compra/${idOrden}`)
			.pipe(map((response) => response.data as OrdenCompraDetalleDto));
	}

	/**
	 * Lista todos los proveedores disponibles.
	 */
	listarProveedores(): Observable<ProveedorDto[]> {
		return this.http
			.get<ApiEnvelope<ProveedorDto[]>>(`${this.baseUrl}/proveedores`)
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Consulta un proveedor específico por su identificador.
	 */
	consultarProveedorPorId(id: number): Observable<ProveedorDto> {
		return this.http
			.get<ApiEnvelope<ProveedorDto>>(`${this.baseUrl}/proveedores/${id}`)
			.pipe(map((response) => response.data as ProveedorDto));
	}

	/**
	 * Consulta un proveedor según su RUC.
	 */
	consultarProveedorPorRuc(ruc: string): Observable<ProveedorDto> {
		return this.http
			.get<ApiEnvelope<ProveedorDto>>(`${this.baseUrl}/proveedores/ruc/${ruc}`)
			.pipe(map((response) => response.data as ProveedorDto));
	}

	/**
	 * Registra un nuevo proveedor.
	 */
	registrarProveedor(dto: ProveedorCreateDto): Observable<ProveedorDto> {
		return this.http
			.post<ApiEnvelope<ProveedorDto>>(`${this.baseUrl}/proveedores`, dto)
			.pipe(map((response) => response.data as ProveedorDto));
	}

	/**
	 * Actualiza los datos de un proveedor existente.
	 */
	actualizarProveedor(id: number, dto: ProveedorUpdateDto): Observable<ProveedorDto> {
		return this.http
			.put<ApiEnvelope<ProveedorDto>>(`${this.baseUrl}/proveedores/${id}`, dto)
			.pipe(map((response) => response.data as ProveedorDto));
	}

	/**
	 * Elimina un proveedor (lógico o físico según implementación backend).
	 */
	eliminarProveedor(id: number): Observable<void> {
		return this.http
			.delete<ApiEnvelope<unknown>>(`${this.baseUrl}/proveedores/${id}`)
			.pipe(map(() => undefined));
	}
}
