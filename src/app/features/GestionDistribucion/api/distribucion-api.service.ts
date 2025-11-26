import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DetalleOrdenDistribucionDto } from '../models/DetalleOrdenDistribucionDto';
import { DetalleTransporteDto } from '../models/DetalleTransporteDto';
import { IncidenciaTransporteCreateDto } from '../models/IncidenciaTransporteCreateDto';
import { IncidenciaTransporteDto } from '../models/IncidenciaTransporteDto';
import { OrdenDistribucionDto } from '../models/OrdenDistribucionDto';
import { SeguimientoCreateDto } from '../models/SeguimientoCreateDto';
import { SeguimientoVehiculoDto } from '../models/SeguimientoVehiculoDto';
import { VehiculoDto } from '../models/VehiculoDto';

interface ApiEnvelope<T> {
	success: boolean;
	message?: string;
	data?: T;
}

@Injectable({ providedIn: 'root' })
export class DistribucionApiService {
	private readonly baseUrl = `${environment.apiUrl}/api/distribucion`;

	constructor(private readonly http: HttpClient) {}

	/**
	 * Provee los datos mostrados por `OrdenesDistribucionTableComponent` (lista principal) y por
	 * `ReporteOrdenesTableComponent`/`ReporteDetalleLotesTableComponent` cuando se consulta el histórico
	 * de entregas. Devuelve `OrdenDistribucionDto[]` con idOrden, requerimiento, estado, prioridad y
	 * fechas para poblar columnas, filtros y acciones (designar movilidad, cancelar, confirmar entrega).
	 */
	consultarOrdenesDistribucion(estado: string = 'PENDIENTE'): Observable<OrdenDistribucionDto[]> {
		const params = new HttpParams().set('estado', estado);
		return this.http
			.get<ApiEnvelope<OrdenDistribucionDto[]>>(`${this.baseUrl}/ordenes`, { params })
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Alimenta al `PopupLoteAsignacionVehiculoComponent` (tabla `app-asignacion-lote-vehiculo-table`)
	 * con el detalle de lotes, y también al flujo de reportes (`ReporteDetalleLotesTableComponent`)
	 * para mostrar cantidades, productos y condiciones de transporte. Retorna
	 * `DetalleOrdenDistribucionDto[]` por orden.
	 */
	consultarDetallesOrden(idOrdenDist: number): Observable<DetalleOrdenDistribucionDto[]> {
		return this.http
			.get<ApiEnvelope<DetalleOrdenDistribucionDto[]>>(`${this.baseUrl}/ordenes/${idOrdenDist}/detalles`)
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Fuente de datos para las opciones del combo en `AsignacionLoteVehiculoTableComponent` y base
	 * para `PopupInfoVehiculoComponent` al consultar características de un vehículo (placa, capacidad,
	 * condición de transporte). Retorna todos los `VehiculoDto` marcados como disponibles.
	 */
	consultarVehiculosDisponibles(): Observable<VehiculoDto[]> {
		return this.http
			.get<ApiEnvelope<VehiculoDto[]>>(`${this.baseUrl}/vehiculos/disponibles`)
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Endpoint previsto para persistir la asignación hecha en `PopupLoteAsignacionVehiculoComponent`
	 * (botón "Confirmar Asignación"). Recibe `SeguimientoCreateDto` con la orden, vehículo y lotes a
	 * transportar, devolviendo el `SeguimientoVehiculoDto` que luego alimentará la vista de
	 * monitoreo. Aún no se invoca desde `DistribucionService.guardarAsignacionVehiculos` por falta de
	 * definición final del backend.
	 */
	registrarVehiculoAOrden(dto: SeguimientoCreateDto): Observable<SeguimientoVehiculoDto> {
		return this.http
			.post<ApiEnvelope<SeguimientoVehiculoDto>>(`${this.baseUrl}/seguimientos`, dto)
			.pipe(map((response) => response.data as SeguimientoVehiculoDto));
	}

	/**
	 * Base de la tabla `MonitoreoVehiculosTableComponent`, que muestra estado, ubicación y próximos
	 * destinos de cada vehículo en ruta. Los datos (`SeguimientoVehiculoDto[]`) también se usan para
	 * habilitar acciones de ver lotes, registrar incidencias y confirmar entregas desde la misma vista.
	 */
	consultarVehiculosEnCamino(): Observable<SeguimientoVehiculoDto[]> {
		return this.http
			.get<ApiEnvelope<SeguimientoVehiculoDto[]>>(`${this.baseUrl}/vehiculos/en-camino`)
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Devuelve los lotes que viajan en un seguimiento específico (`DetalleTransporteDto[]`), usados por
	 * `VehiculoLotesTableComponent` y como insumo para `PopupCrearIncidenciaComponent` (lista de lotes
	 * disponibles cuando la incidencia aplica a un detalle). Se invoca desde
	 * `DistribucionService.getLotesBySeguimientoId`.
	 */
	consultarLotesDelVehiculo(idSeguimiento: number): Observable<DetalleTransporteDto[]> {
		return this.http
			.get<ApiEnvelope<DetalleTransporteDto[]>>(`${this.baseUrl}/seguimientos/${idSeguimiento}/lotes`)
			.pipe(map((response) => response.data || []));
	}

	/**
	 * Acción disparada por el formulario `PopupCrearIncidenciaComponent`. Envía un
	 * `IncidenciaTransporteCreateDto` con tipo, impacto, descripción y (opcionalmente) idDetalleDist e
	 * idVehiculo. Responde con la incidencia creada para refrescar el listado asociado a la orden.
	 */
	registrarIncidencia(dto: IncidenciaTransporteCreateDto): Observable<IncidenciaTransporteDto> {
		return this.http
			.post<ApiEnvelope<IncidenciaTransporteDto>>(`${this.baseUrl}/incidencias`, dto)
			.pipe(map((response) => response.data as IncidenciaTransporteDto));
	}

	/**
	 * Se usa dentro de `DistribucionService.getIncidenciasByOrdenId` para alimentar
	 * `ReporteIncidenciasTableComponent` (modal de incidencias por orden). Retorna
	 * `IncidenciaTransporteDto[]` asociados a un vehículo; el servicio los filtra por idOrdenDist
	 * hasta que exista un endpoint directo `/ordenes/{id}/incidencias`.
	 */
	consultarIncidenciasPorVehiculo(idVehiculo: number): Observable<IncidenciaTransporteDto[]> {
		return this.http
			.get<ApiEnvelope<IncidenciaTransporteDto[]>>(`${this.baseUrl}/vehiculos/${idVehiculo}/incidencias`)
			.pipe(map((response) => response.data || []));
	}
}

/*
 * Backend pendiente identificado en los componentes suministrados:
 *
 * - `PopupLoteAsignacionVehiculoComponent` y `AsignacionLoteVehiculoTableComponent`: necesitan un
 *   POST `/ordenes/{idOrden}/asignaciones` (o reutilizar `registrarVehiculoAOrden`) que acepte la
 *   matriz de lotes con idVehiculoAsignado, valide compatibilidad vehículo-condición y devuelva el
 *   nuevo `SeguimientoVehiculoDto`. Actualmente `DistribucionService.guardarAsignacionVehiculos`
 *   lanza un error porque no existe este endpoint en el backend.
 *
 * - `PopupInfoLoteComponent`: requiere un GET `/lotes/{idLote}` (idealmente dentro del dominio de
 *   almacenamiento) que exponga `LoteProductoDto` con cantidades actual/ inicial, fechas y estado.
 *   Sin ese servicio, el overlay opera con un stub (`getInfoLote`).
 *
 * - `PopupConfirmacionEntregaComponent` y `PopupCancelarOrdenComponent`: dependen de acciones POST
 *   `/ordenes/{id}/confirmacion-entrega` y `/ordenes/{id}/cancelacion` que actualicen estado de la
 *   orden, cierren seguimientos y devuelvan la orden/seguimiento actualizado para refrescar las
 *   tablas. Actualmente `DistribucionService.confirmarEntrega` y `.cancelarOrden` lanzan errores.
 *
 * - `ReporteOrdenesTableComponent`, `ReporteDetalleLotesTableComponent` e `IncidenciasReporte`
 *   todavía ensamblan la información mediante múltiples llamadas (`consultarOrdenesDistribucion`,
 *   `consultarDetallesOrden`, `consultarVehiculosEnCamino`, `consultarIncidenciasPorVehiculo`). Se
 *   sugiere un endpoint consolidado `/ordenes/{id}/reporte` y otro `/ordenes/{id}/incidencias` para
 *   reducir round-trips y calcular campos como `tieneIncidencias` en el backend.
 */

