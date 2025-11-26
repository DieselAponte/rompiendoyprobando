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

  /**
   * Flujo asociado: botón "Atender Requerimiento" del `DetalleRequerimientoAtenderTableComponent`
   * dentro de `disponibilidad-producto`. Una vez que se deje de usar el stub `aceptarRequerimiento`,
   * esta llamada persistirá las decisiones tomadas y devuelve un `ProgramacionResultadoDto` con los
   * IDs de órdenes generadas (distribución y/o compras) para mostrar confirmaciones en la UI.
   */
  registrarOrden(dto: ProgramacionRequestDto): Observable<ProgramacionResultadoDto> {
    return this.http.post<ProgramacionResultadoDto>(`${this.baseUrl}/registrar-orden`, dto);
  }

  /**
   * Alimenta al `RequerimientosPendientesTableComponent` (lista de no atendidos) y al flujo de
   * `DisponibilidadProductoComponent` cuando necesita preseleccionar un requerimiento. Devuelve
   * `RequerimientoResumenDto[]` con ID, fecha de solicitud, departamento, prioridad y estado
   * que se renderizan directamente en la tabla y filtros adjuntos (`SearchBarNoAtendidos`).
   */
  getRequerimientosPendientes(): Observable<RequerimientoResumenDto[]> {
    return this.http.get<RequerimientoResumenDto[]>(`${this.baseUrl}/requerimientos/pendientes`);
  }

  /**
   * Usado por `DetalleRequerimientoAtenderTableComponent` (vista disponibilidad) y por el overlay
   * `PopupDetalleDeRequerimientoComponent` para mostrar cada línea solicitada. Entrega los campos
   * de `DetalleRequerimientoDto` (producto, cantidades, condiciones y observaciones) que se
   * complementan con la selección de decisión y con la navegación a la pantalla de atender.
   */
  getDetallesRequerimiento(requerimientoId: number): Observable<DetalleRequerimientoDto[]> {
    return this.http.get<DetalleRequerimientoDto[]>(`${this.baseUrl}/requerimientos/${requerimientoId}/detalles`);
  }

  /**
   * Respaldado por el popup `PopupRevisarStockProductoComponent`, abierto desde la tabla de
   * atención de requerimientos para validar la disponibilidad física. Devuelve `InventarioStockDto[]`
   * (número de lote, stock actual, ubicación, temperatura y fechas) para poblar la MatTable del overlay.
   */
  getStockProducto(productoId: number): Observable<InventarioStockDto[]> {
    return this.http.get<InventarioStockDto[]>(`${this.baseUrl}/productos/${productoId}/stock`);
  }

  /*
   * Backend pendiente para los componentes sin datos reales adjuntos en la solicitud:
   *
   * 1) `ListaRequerimientosAtendidosComponent`, `OrdenDistribucionTableComponent` y
   *    `PopupDetalleOrdenDistribucionComponent` requieren un GET paginado `/ordenes/distribucion`
   *    y un GET `/ordenes/distribucion/{id}`. Ambos deben exponer `DetalleOrdenDistribucionDto`
   *    con estado, fechas, lotes y condiciones. Pasos backend: consultar órdenes atendidas con
   *    filtros (ID/fecha), mapear entidades JPA a DTO y manejar 404 para IDs inexistentes.
   *
   * 2) `SolicitudComprasTableComponent` y `PopupDetalleSolicitudDeCompraComponent` necesitan un
   *    GET `/solicitudes/compras` y GET `/solicitudes/compras/{id}` que devuelvan
   *    `DetalleSolicitudCompraDto` incluyendo producto, proveedor asignado, precio referencial y
   *    estado. Backend debe separar cabecera/detalle, normalizar relaciones y exponer nombres de
   *    proveedor/producto ya resueltos para la tabla.
   *
   * 3) El botón "Atender Requerimiento" de `DetalleRequerimientoAtenderTableComponent` todavía usa
   *    el stub `ProgramacionService.aceptarRequerimiento`. Se requiere un endpoint (p.ej.
   *    `POST /requerimientos/{id}/atender`) que reciba las decisiones por línea y observaciones,
   *    valide estado vigente, genere la orden correspondiente (distribución/compras) y responda con
   *    un `ProgramacionResultadoDto` o mensaje estándar para refrescar las tablas.
   */
}
