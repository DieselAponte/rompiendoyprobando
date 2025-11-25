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

	consultarOrdenesDistribucion(estado: string = 'PENDIENTE'): Observable<OrdenDistribucionDto[]> {
		const params = new HttpParams().set('estado', estado);
		return this.http
			.get<ApiEnvelope<OrdenDistribucionDto[]>>(`${this.baseUrl}/ordenes`, { params })
			.pipe(map((response) => response.data || []));
	}

	consultarDetallesOrden(idOrdenDist: number): Observable<DetalleOrdenDistribucionDto[]> {
		return this.http
			.get<ApiEnvelope<DetalleOrdenDistribucionDto[]>>(`${this.baseUrl}/ordenes/${idOrdenDist}/detalles`)
			.pipe(map((response) => response.data || []));
	}

	consultarVehiculosDisponibles(): Observable<VehiculoDto[]> {
		return this.http
			.get<ApiEnvelope<VehiculoDto[]>>(`${this.baseUrl}/vehiculos/disponibles`)
			.pipe(map((response) => response.data || []));
	}

	registrarVehiculoAOrden(dto: SeguimientoCreateDto): Observable<SeguimientoVehiculoDto> {
		return this.http
			.post<ApiEnvelope<SeguimientoVehiculoDto>>(`${this.baseUrl}/seguimientos`, dto)
			.pipe(map((response) => response.data as SeguimientoVehiculoDto));
	}

	consultarVehiculosEnCamino(): Observable<SeguimientoVehiculoDto[]> {
		return this.http
			.get<ApiEnvelope<SeguimientoVehiculoDto[]>>(`${this.baseUrl}/vehiculos/en-camino`)
			.pipe(map((response) => response.data || []));
	}

	consultarLotesDelVehiculo(idSeguimiento: number): Observable<DetalleTransporteDto[]> {
		return this.http
			.get<ApiEnvelope<DetalleTransporteDto[]>>(`${this.baseUrl}/seguimientos/${idSeguimiento}/lotes`)
			.pipe(map((response) => response.data || []));
	}

	registrarIncidencia(dto: IncidenciaTransporteCreateDto): Observable<IncidenciaTransporteDto> {
		return this.http
			.post<ApiEnvelope<IncidenciaTransporteDto>>(`${this.baseUrl}/incidencias`, dto)
			.pipe(map((response) => response.data as IncidenciaTransporteDto));
	}

	consultarIncidenciasPorVehiculo(idVehiculo: number): Observable<IncidenciaTransporteDto[]> {
		return this.http
			.get<ApiEnvelope<IncidenciaTransporteDto[]>>(`${this.baseUrl}/vehiculos/${idVehiculo}/incidencias`)
			.pipe(map((response) => response.data || []));
	}
}

