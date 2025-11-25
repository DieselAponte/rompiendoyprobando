import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { ProgramacionApiService } from '../api/programacion-api.service';
import { DetalleRequerimientoDto } from '../models/DetalleRequerimientoDto';
import { InventarioStockDto } from '../models/InventarioStockDto';
import { ProgramacionRequestDto } from '../models/ProgramacionRequestDto';
import { ProgramacionResultadoDto } from '../models/ProgramacionResultadoDto';
import { RequerimientoResumenDto } from '../models/RequerimientoResumenDto';
import { DetalleSolicitudCompraDto } from '../models/DetalleSolicitudCompraDto';
import { DetalleOrdenDistribucionDto } from '../models/DetalleOrdenDistribucionDto';

export type DetalleRequerimientoDecision = DetalleRequerimientoDto & {
	decision?: 'COMPRAS' | 'DISTRIBUCION';
};

@Injectable({ providedIn: 'root' })
export class ProgramacionService {
	private readonly productosAtenderSubject = new BehaviorSubject<DetalleRequerimientoDecision[]>([]);

	constructor(private readonly api: ProgramacionApiService) {}

	getRequerimientosPendientesTabla(): Observable<RequerimientoResumenDto[]> {
		return this.api.getRequerimientosPendientes();
	}

	loadProductosParaAtender(requerimientoId: string | number): void {
		const id = Number(requerimientoId);
		if (Number.isNaN(id)) {
			this.productosAtenderSubject.next([]);
			return;
		}

		this.api
			.getDetallesRequerimiento(id)
			.pipe(
				map((detalles) =>
					detalles.map((detalle) => {
						const anterior = this.productosAtenderSubject.value.find((prev) => prev.id === detalle.id);
						return { ...detalle, decision: anterior?.decision };
					})
				),
				catchError(() => of([]))
			)
			.subscribe((detalles) => this.productosAtenderSubject.next(detalles));
	}

	getProductosParaAtender(): Observable<DetalleRequerimientoDecision[]> {
		return this.productosAtenderSubject.asObservable();
	}

	getRequerimientoDetalle(requerimientoId: number): Observable<DetalleRequerimientoDto[]> {
		return this.api.getDetallesRequerimiento(requerimientoId);
	}

	getLotesByProducto(productoId: string | number): Observable<InventarioStockDto[]> {
		const id = Number(productoId);
		if (Number.isNaN(id)) {
			return of([]);
		}
		return this.api.getStockProducto(id);
	}

	registrarOrden(dto: ProgramacionRequestDto): Observable<ProgramacionResultadoDto> {
		return this.api.registrarOrden(dto);
	}

	// TODO: Reemplazar por endpoints reales cuando estén disponibles.
	// Backend requerido:
	// 1. GET /api/programacion/ordenes/distribucion  -> Debe devolver la lista paginada de DetalleOrdenDistribucionDto
	//    que corresponde a las órdenes ya atendidas, incluyendo estado, fechas y usuario responsable.
	//    Implementación sugerida:
	//      - Exponer un método en el controller ProgramacionController que invoque un servicio de dominio
	//        para buscar las órdenes atendidas en base a filtros opcionales (fecha, requerimiento, almacén).
	//      - Mapear las entidades JPA a DetalleOrdenDistribucionDto respetando los nombres camelCase
	//        que ya consume el frontend.
	// 2. GET /api/programacion/ordenes/distribucion/{id} -> Retorna el detalle completo (productos, lotes, cantidades)
	//    de una orden específica. El backend debe validar que el id exista y responder 404 en caso contrario.
	// 3. GET /api/programacion/solicitudes/compras y GET /api/programacion/solicitudes/compras/{id}
	//    -> Deben entregar la misma estructura que DetalleSolicitudCompraDto, diferenciando cabecera y detalle.
	// 4. POST /api/programacion/requerimientos/{id}/aceptar -> Marca el requerimiento como atendido y registra
	//    la decisión tomada (Distribución o Compras) junto con observaciones. El backend debe:
	//      a) Validar estados y permisos.
	//      b) Actualizar la entidad y generar la orden correspondiente.
	//      c) Responder un body con el resultado o un mensaje estándar para que el frontend actualice las tablas.
	// Cuando estos endpoints estén listos, reemplazar los "of([])" y arrays vacíos conectando las llamadas
	// con ProgramacionApiService para cada método (ordenes, solicitudes y aceptación).
	getOrdenDistribucion(): Observable<DetalleOrdenDistribucionDto[]> {
		return of([]);
	}

	getOrdenDistribucionById(_id: number): DetalleOrdenDistribucionDto[] {
		return [];
	}

	getSolicitudCompra(): Observable<DetalleSolicitudCompraDto[]> {
		return of([]);
	}

	getSolicitudCompraById(_id: number): DetalleSolicitudCompraDto[] {
		return [];
	}

	aceptarRequerimiento(_idReq: number): void {
		console.warn('aceptarRequerimiento aún no está implementado contra el backend.');
	}
}