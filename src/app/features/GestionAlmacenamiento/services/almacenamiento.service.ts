import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, catchError, map, switchMap } from 'rxjs';
import { AlmacenamientoApiService } from '../api/almacenamiento-api.service';
import { AjusteInventarioDto } from '../models/AjusteInventarioDto';
import { IncidenciaLoteCreateDto } from '../models/IncidenciaLoteCreateDto';
import { IncidenciaLoteDto } from '../models/IncidenciaLoteDto';
import { InventarioDto } from '../models/InventarioDto';
import { LoteCreateDto } from '../models/LoteCreateDto';
import { LoteProductoDto } from '../models/LoteProductoDto';
import { MovimientoInventarioDto } from '../models/MovimientoInventarioDto';
import { ProductoResumenDto } from '../../GestionProgramacion/models/DetalleRequerimientoDto';

@Injectable({ providedIn: 'root' })
export class AlmacenamientoService {
  constructor(private readonly api: AlmacenamientoApiService) {}

  ajustarInventario(dto: AjusteInventarioDto): Observable<void> {
    return this.api.actualizarInventario(dto).pipe(map(() => void 0));
  }

  getInventario(): Observable<InventarioDto[]> {
    return this.api.consultarInventario();
  }

  getLotesAtendidos(): Observable<InventarioDto[]> {
    return this.getInventario();
  }

  getDetalleInventario(idInventario: number): Observable<InventarioDto> {
    return this.api.consultarDetalleInventario(idInventario);
  }

  getMovimientosInventario(idInventario: number): Observable<MovimientoInventarioDto[]> {
    if (!idInventario) {
      return of([]);
    }
    return this.api
      .consultarMovimientosInventario(idInventario)
      .pipe(catchError(() => of([])));
  }

  getLotesProducto(): Observable<LoteProductoDto[]> {
    return this.api.consultarInventario().pipe(
      map((inventario) =>
        Array.from(
          new Set(
            inventario
              .map((item) => item.idLote?.id)
              .filter((id): id is number => typeof id === 'number')
          )
        )
      ),
      switchMap((ids) => {
        if (!ids.length) {
          return of([]);
        }
        return forkJoin(ids.map((id) => this.api.consultarDetalleLote(id)));
      }),
      catchError(() => of([]))
    );
  }

  getLotesAlmacenados(descripcion?: string): Observable<LoteProductoDto[]> {
    return this.getLotesProducto().pipe(
      map((lotes) => {
        const term = descripcion?.trim().toLowerCase();
        if (!term) {
          return lotes;
        }
        return lotes.filter((lote) => {
          const searchableValues = [
            lote.numeroLote,
            lote.idProducto?.nombreProducto,
            lote.idProducto?.codigoDigemid
          ]
            .filter((value): value is string => !!value)
            .map((value) => value.toLowerCase());
          return searchableValues.some((value) => value.includes(term));
        });
      })
    );
  }

  registrarLote(dto: LoteCreateDto): Observable<LoteProductoDto> {
    return this.api.registrarLote(dto);
  }

  registrarIncidencia(dto: IncidenciaLoteCreateDto): Observable<IncidenciaLoteDto> {
    return this.api.registrarIncidencia(dto);
  }

  getIncidenciasPorLote(idLote: number): Observable<IncidenciaLoteDto[]> {
    return this.api.consultarIncidenciasPorLote(idLote);
  }

  actualizarEstadoOrdenCompra(idOrdenCompra: number, nuevoEstado: string): Observable<void> {
    return this.api.actualizarEstadoOrdenCompra(idOrdenCompra, nuevoEstado).pipe(map(() => void 0));
  }

  getProductosPorInventarioOIdLote(codigo: string): Observable<ProductoResumenDto[]> {
    const parsed = Number(codigo);
    if (!codigo || Number.isNaN(parsed)) {
      return of([]);
    }
    return this.resolveLoteProductoByCode(parsed).pipe(
      map((lote) => (lote ? [lote.idProducto] : []))
    );
  }

  getProductoPorCodigoDigemid(codigo: string): Observable<ProductoResumenDto | null> {
    if (!codigo) {
      return of(null);
    }
    const normalized = codigo.trim().toLowerCase();
    return this.getLotesProducto().pipe(
      map((lotes) =>
        lotes
          .map((lote) => lote.idProducto)
          .find((producto) => (producto.codigoDigemid || '').toLowerCase() === normalized) || null
      )
    );
  }

  private resolveLoteProductoByCode(code: number): Observable<LoteProductoDto | null> {
    return this.api.consultarDetalleInventario(code).pipe(
      switchMap((inventario) => {
        const loteId = inventario.idLote?.id;
        if (!loteId) {
          return of(null);
        }
        return this.api.consultarDetalleLote(loteId);
      }),
      catchError(() =>
        this.api.consultarDetalleLote(code).pipe(
          catchError(() => of(null))
        )
      )
    );
  }
}
