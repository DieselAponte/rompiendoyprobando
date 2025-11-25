import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AjusteInventarioDto } from '../models/AjusteInventarioDto';
import { IncidenciaLoteCreateDto } from '../models/IncidenciaLoteCreateDto';
import { IncidenciaLoteDto } from '../models/IncidenciaLoteDto';
import { InventarioDto } from '../models/InventarioDto';
import { LoteCreateDto } from '../models/LoteCreateDto';
import { LoteProductoDto } from '../models/LoteProductoDto';
import { MovimientoInventarioDto } from '../models/MovimientoInventarioDto';

interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data?: T;
}

@Injectable({ providedIn: 'root' })
export class AlmacenamientoApiService {
  private readonly baseUrl = `${environment.apiUrl}/api/almacenamiento`;

  constructor(private readonly http: HttpClient) {}

  actualizarInventario(dto: AjusteInventarioDto): Observable<ApiEnvelope<null>> {
    return this.http.post<ApiEnvelope<null>>(`${this.baseUrl}/inventario/ajuste`, dto);
  }

  consultarInventario(): Observable<InventarioDto[]> {
    return this.http
      .get<ApiEnvelope<InventarioDto[]>>(`${this.baseUrl}/inventario`)
      .pipe(map((response) => response.data || []));
  }

  consultarDetalleInventario(idInventario: number): Observable<InventarioDto> {
    return this.http
      .get<ApiEnvelope<InventarioDto>>(`${this.baseUrl}/inventario/${idInventario}`)
      .pipe(map((response) => response.data as InventarioDto));
  }

  consultarMovimientosInventario(idInventario: number): Observable<MovimientoInventarioDto[]> {
    return this.http
      .get<ApiEnvelope<MovimientoInventarioDto[]>>(`${this.baseUrl}/inventario/${idInventario}/movimientos`)
      .pipe(map((response) => response.data || []));
  }

  registrarLote(dto: LoteCreateDto): Observable<LoteProductoDto> {
    return this.http
      .post<ApiEnvelope<LoteProductoDto>>(`${this.baseUrl}/lotes`, dto)
      .pipe(map((response) => response.data as LoteProductoDto));
  }

  consultarDetalleLote(idLote: number): Observable<LoteProductoDto> {
    return this.http
      .get<ApiEnvelope<LoteProductoDto>>(`${this.baseUrl}/lotes/${idLote}`)
      .pipe(map((response) => response.data as LoteProductoDto));
  }

  consultarIncidenciasPorLote(idLote: number): Observable<IncidenciaLoteDto[]> {
    return this.http
      .get<ApiEnvelope<IncidenciaLoteDto[]>>(`${this.baseUrl}/lotes/${idLote}/incidencias`)
      .pipe(map((response) => response.data || []));
  }

  registrarIncidencia(dto: IncidenciaLoteCreateDto): Observable<IncidenciaLoteDto> {
    return this.http
      .post<ApiEnvelope<IncidenciaLoteDto>>(`${this.baseUrl}/incidencias`, dto)
      .pipe(map((response) => response.data as IncidenciaLoteDto));
  }

  actualizarEstadoOrdenCompra(idOrdenCompra: number, nuevoEstado: string): Observable<ApiEnvelope<null>> {
    const params = new HttpParams().set('nuevoEstado', nuevoEstado);
    return this.http.put<ApiEnvelope<null>>(
      `${this.baseUrl}/ordenes-compra/${idOrdenCompra}/estado`,
      {},
      { params }
    );
  }
}
