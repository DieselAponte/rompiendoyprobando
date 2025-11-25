import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DetalleRequerimientoDto } from '../models/DetalleRequerimientoDto';
import { InventarioStockDto } from '../models/InventarioStockDto';
import { ProgramacionRequestDto } from '../models/ProgramacionRequestDto';
import { ProgramacionResultadoDto } from '../models/ProgramacionResultadoDto';
import { RequerimientoResumenDto } from '../models/RequerimientoResumenDto';

@Injectable({ providedIn: 'root' })
export class ProgramacionApiService {
  private readonly baseUrl = `${environment.apiUrl}/api/programacion`;

  constructor(private readonly http: HttpClient) {}

  registrarOrden(dto: ProgramacionRequestDto): Observable<ProgramacionResultadoDto> {
    return this.http.post<ProgramacionResultadoDto>(`${this.baseUrl}/registrar-orden`, dto);
  }

  getRequerimientosPendientes(): Observable<RequerimientoResumenDto[]> {
    return this.http.get<RequerimientoResumenDto[]>(`${this.baseUrl}/requerimientos/pendientes`);
  }

  getDetallesRequerimiento(requerimientoId: number): Observable<DetalleRequerimientoDto[]> {
    return this.http.get<DetalleRequerimientoDto[]>(`${this.baseUrl}/requerimientos/${requerimientoId}/detalles`);
  }

  getStockProducto(productoId: number): Observable<InventarioStockDto[]> {
    return this.http.get<InventarioStockDto[]>(`${this.baseUrl}/productos/${productoId}/stock`);
  }
}
