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

  /**
   * Acción disparada desde flujos de ajustes (e.g., botones de `ListaInventarioTableComponent`
   * o formularios que consumen `AlmacenamientoService.ajustarInventario`). Permite a la UI aplicar
   * correcciones de stock y refrescar las tablas de inventario.
   */
  actualizarInventario(dto: AjusteInventarioDto): Observable<ApiEnvelope<null>> {
    return this.http.post<ApiEnvelope<null>>(`${this.baseUrl}/inventario/ajuste`, dto);
  }

  /**
   * Fuente principal de datos para `ListaInventarioTableComponent`, `LotesAtendidosTableComponent`,
   * `LotesRecibidosTableComponent`, `SearchInfoDespachoComponent` y otros listados que muestran
   * stock, lotes y ubicaciones. Devuelve todos los `InventarioDto` necesarios para las tablas y
   * para componer selecciones en `ProdPerteneceLoteComponent`.
   */
  consultarInventario(): Observable<InventarioDto[]> {
    return this.http
      .get<ApiEnvelope<InventarioDto[]>>(`${this.baseUrl}/inventario`)
      .pipe(map((response) => response.data || []));
  }

  /**
   * Usado cuando una fila se selecciona en `ListaInventarioTableComponent` o cuando se necesita
   * abrir un detalle previo a registrar movimientos. Entrega un `InventarioDto` puntual para llenar
   * paneles laterales o formularios de edición.
   */
  consultarDetalleInventario(idInventario: number): Observable<InventarioDto> {
    return this.http
      .get<ApiEnvelope<InventarioDto>>(`${this.baseUrl}/inventario/${idInventario}`)
      .pipe(map((response) => response.data as InventarioDto));
  }

  /**
   * Alimenta el `PopupReporteLoteComponent`, que muestra el historial de movimientos (cantidad,
   * usuario, tipo de referencia) para un inventario. Responde `MovimientoInventarioDto[]` que luego
   * también se resumen en tablas de auditoría.
   */
  consultarMovimientosInventario(idInventario: number): Observable<MovimientoInventarioDto[]> {
    return this.http
      .get<ApiEnvelope<MovimientoInventarioDto[]>>(`${this.baseUrl}/inventario/${idInventario}/movimientos`)
      .pipe(map((response) => response.data || []));
  }

  /**
   * Acción invocada desde los formularios de recepción (`ObservacionesAccionRegistrarComponent`,
   * `ProdPerteneceLoteComponent`) al confirmar un nuevo lote. Devuelve el `LoteProductoDto`
   * registrado para actualizar `LotesRecibidosTableComponent`.
   */
  registrarLote(dto: LoteCreateDto): Observable<LoteProductoDto> {
    return this.http
      .post<ApiEnvelope<LoteProductoDto>>(`${this.baseUrl}/lotes`, dto)
      .pipe(map((response) => response.data as LoteProductoDto));
  }

  /**
   * Utilizado cuando se abre el flujo de registro/detalle (botón "Registrar lote" en
   * `LotesRecibidosTableComponent`). Permite precargar número de lote, cantidades y fechas mediante
   * un `LoteProductoDto` individual.
   */
  consultarDetalleLote(idLote: number): Observable<LoteProductoDto> {
    return this.http
      .get<ApiEnvelope<LoteProductoDto>>(`${this.baseUrl}/lotes/${idLote}`)
      .pipe(map((response) => response.data as LoteProductoDto));
  }

  /**
   * Base para cualquier overlay de incidencias asociado a lotes (e.g., secciones de historial o
   * futuras ampliaciones del `PopupRegistroIncidenciaComponent`). Retorna
   * `IncidenciaLoteDto[]` con estado, prioridad y descripción.
   */
  consultarIncidenciasPorLote(idLote: number): Observable<IncidenciaLoteDto[]> {
    return this.http
      .get<ApiEnvelope<IncidenciaLoteDto[]>>(`${this.baseUrl}/lotes/${idLote}/incidencias`)
      .pipe(map((response) => response.data || []));
  }

  /**
   * Invocado por `PopupRegistroIncidenciaComponent` (botón "Registrar Lote e incidencia") cuando se
   * reporta un problema durante la recepción. Devuelve la incidencia creada para añadirla al
   * historial local.
   */
  registrarIncidencia(dto: IncidenciaLoteCreateDto): Observable<IncidenciaLoteDto> {
    return this.http
      .post<ApiEnvelope<IncidenciaLoteDto>>(`${this.baseUrl}/incidencias`, dto)
      .pipe(map((response) => response.data as IncidenciaLoteDto));
  }

  /**
   * Utilizado por `AlmacenamientoService.actualizarEstadoOrdenCompra`, que a su vez lo llaman
   * flujos como `ObservacionesAccionComponent` al despachar o recepcionar. Permite notificar al
   * dominio de compras que la orden cambió de estado tras registrar inventario.
   */
  actualizarEstadoOrdenCompra(idOrdenCompra: number, nuevoEstado: string): Observable<ApiEnvelope<null>> {
    const params = new HttpParams().set('nuevoEstado', nuevoEstado);
    return this.http.put<ApiEnvelope<null>>(
      `${this.baseUrl}/ordenes-compra/${idOrdenCompra}/estado`,
      {},
      { params }
    );
  }
}

/*
 * Gaps detectados:
 *
 * - `SearchInfoDigemidComponent` y `SearchInfoDespachoComponent` dependen hoy de llamadas masivas a
 *   `consultarInventario` para luego filtrar por código DIGEMID o ID de lote en el front. Se
 *   recomienda exponer endpoints específicos (`GET /productos/digemid/{codigo}` y
 *   `GET /inventario/buscar?codigo=...`) que devuelvan `ProductoResumenDto`/`InventarioDto` filtrado
 *   para reducir carga y tiempos de respuesta.
 *
 * - `PopupReporteLoteComponent` incluye un botón pendiente para marcar incidencias como resueltas.
 *   Falta un endpoint (p.ej. `PUT /lotes/{idLote}/incidencias/{idIncidencia}/resolver`) que actualice
 *   el estado y registre usuario/fecha. El componente solo emitirá el evento cuando el backend
 *   soporte esta operación.
 *
 * - `ObservacionesAccionRegistrarComponent` ofrece la opción "Agregar incidencia y Registrar lote".
 *   Para evitar múltiples llamadas secuenciales, sería útil un endpoint transaccional
 *   `/lotes/registro-con-incidencia` que reciba el lote, observaciones y la incidencia en un solo
 *   payload y devuelva ambos DTO, asegurando que inventario e incidencias se registren juntos.
 */
