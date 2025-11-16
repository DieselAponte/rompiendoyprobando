import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Entidades de dominio
export interface Requerimiento {
  id_req: string;
  id_usr: string;
  id_dep: string;
  fecha: string; // dd/mm/yyyy
  descripcion: string;
  prioridad: 'ALTA' | 'MEDIA' | 'BAJA';
  status_req: 'pendiente' | 'atendido' | 'cancelado';
  productos: ProductoRequerido[];
}

export interface RequerimientoPendiente extends Requerimiento {
  status_req: 'pendiente';
}

export interface RequerimientoAtendido extends Requerimiento {
  status_req: 'atendido' | 'cancelado';
}

export interface ProductoRequerido {
  id_producto: string;
  nombre: string;
  cantidad: number;
  proveedorSeleccionado?: string; // id del proveedor/punto de venta
}

export interface StockPuntoVenta {
  id_puntoVenta: string;
  nombre_puntoventa: string;
  id_producto: string;
  nombre_producto: string;
  stock_prod: number;
}

// DTOs para las tablas (coinciden con las columnas de los templates)
export interface RequerimientoRow {
  id_req: string;
  id_usr: string;
  id_dep: string;
  fecha_emision: string;
  descripcion: string;
  prioridad: string;
  estado: string;
}

export interface ProductoSolicitadoRow {
  id_prod: string;
  nombre: string;
  cantidad: number;
  proveedor_seleccionado?: string;
}

export interface PuntoVentaProductoRow {
  id_puntoVenta: string;
  nombre_puntoVenta: string;
  id_producto: string;
  nombre_producto: string;
  stock_producto: number;
}

@Injectable({ providedIn: 'root' })
export class ProgramacionService {
  private readonly requerimientosSubject = new BehaviorSubject<Requerimiento[]>([
    {
      id_req: 'REQ01',
      id_usr: 'U001',
      id_dep: 'D001',
      fecha: '20/10/2024',
      descripcion: 'Necesito 50 unidades',
      prioridad: 'ALTA',
      status_req: 'pendiente',
      productos: [
        { id_producto: 'P001', nombre: 'Aspirina', cantidad: 150 },
        { id_producto: 'P002', nombre: 'Paracetamol', cantidad: 80 },
      ],
    },
    {
      id_req: 'REQ02',
      id_usr: 'U002',
      id_dep: 'D002',
      fecha: '22/10/2024',
      descripcion: 'Requerimiento de prueba',
      prioridad: 'MEDIA',
      status_req: 'atendido',
      productos: [
        { id_producto: 'P003', nombre: 'Ibuprofeno', cantidad: 60 },
      ],
    },
  ]);

  readonly requerimientos$ = this.requerimientosSubject.asObservable();

  // Accesores base
  getRequerimientos(): Requerimiento[] {
    return this.requerimientosSubject.value;
  }

  getRequerimientoById(id: string): Requerimiento | undefined {
    return this.getRequerimientos().find((r) => r.id_req === id);
  }

  // Marca el proveedor seleccionado para un producto específico en un requerimiento
  markProductoProveedor(idReq: string, idProducto: string, proveedorId: string) {
    const reqs = this.getRequerimientos().map((r) => {
      if (r.id_req !== idReq) return r;
      return {
        ...r,
        productos: r.productos.map((p) =>
          p.id_producto === idProducto ? { ...p, proveedorSeleccionado: proveedorId } : p
        ),
      };
    });
    this.requerimientosSubject.next(reqs);
  }

  // Verifica si todos los productos de un requerimiento tienen proveedor seleccionado
  areAllProductosSelected(idReq: string): boolean {
    const r = this.getRequerimientoById(idReq);
    if (!r) return false;
    return r.productos.every((p) => !!p.proveedorSeleccionado);
  }

  // Finaliza un requerimiento: aceptar -> atendido, cancelar -> cancelado
  finalizeRequerimiento(idReq: string, accion: 'cancelar' | 'aceptar') {
    const reqs = this.getRequerimientos().map((r) => {
      if (r.id_req !== idReq) return r;
      const status: Requerimiento['status_req'] = accion === 'aceptar' ? 'atendido' : 'cancelado';
      return { ...r, status_req: status };
    });
    this.requerimientosSubject.next(reqs);
  }

  // Mock de stock por producto (dominio)
  getStockByProducto(productoId: string): StockPuntoVenta[] {
    const nombre =
      productoId === 'P001' ? 'Aspirina' : productoId === 'P002' ? 'Paracetamol' : productoId === 'P003' ? 'Ibuprofeno' : 'Producto';
    return [
      { id_puntoVenta: 'PV_001', nombre_puntoventa: 'PuntoVenta_A', id_producto: productoId, nombre_producto: nombre, stock_prod: 120 },
      { id_puntoVenta: 'PV_002', nombre_puntoventa: 'PuntoVenta_B', id_producto: productoId, nombre_producto: nombre, stock_prod: 60 },
      { id_puntoVenta: 'PV_003', nombre_puntoventa: 'PuntoVenta_C', id_producto: productoId, nombre_producto: nombre, stock_prod: 200 },
    ];
  }

  // --------- Vistas: Listas de Requerimientos (Tablas) ---------
  getRequerimientosPendientes(): Observable<RequerimientoPendiente[]> {
    return this.requerimientos$.pipe(
      map((rs) => rs.filter((r): r is RequerimientoPendiente => r.status_req === 'pendiente'))
    );
  }

  getRequerimientosAtendidos(): Observable<RequerimientoAtendido[]> {
    return this.requerimientos$.pipe(
      map((rs) => rs.filter((r): r is RequerimientoAtendido => r.status_req !== 'pendiente'))
    );
  }

  // Formato exactamente como lo esperan las tablas de requerimientos (columnas fecha_emision y estado)
  getRequerimientosPendientesTabla(): Observable<RequerimientoRow[]> {
    return this.getRequerimientosPendientes().pipe(map(this.mapRequerimientosToRows));
  }

  getRequerimientosAtendidosTabla(): Observable<RequerimientoRow[]> {
    return this.getRequerimientosAtendidos().pipe(map(this.mapRequerimientosToRows));
  }

  private mapRequerimientosToRows(rs: Requerimiento[]): RequerimientoRow[] {
    return rs.map((r) => ({
      id_req: r.id_req,
      id_usr: r.id_usr,
      id_dep: r.id_dep,
      fecha_emision: r.fecha,
      descripcion: r.descripcion,
      prioridad: r.prioridad,
      estado: r.status_req,
    }));
  }

  // --------- Vista: Disponibilidad de Producto (Productos solicitados) ---------
  // Productos de un requerimiento en formato de tabla
  getProductosSolicitadosTabla(idReq: string): Observable<ProductoSolicitadoRow[]> {
    return this.requerimientos$.pipe(
      map((rs) => rs.find((r) => r.id_req === idReq)),
      map((r) =>
        (r?.productos ?? []).map((p) => ({
          id_prod: p.id_producto,
          nombre: p.nombre,
          cantidad: p.cantidad,
          proveedor_seleccionado: p.proveedorSeleccionado,
        }))
      )
    );
  }

  // Seleccionar proveedor para un producto (actualiza dominio)
  seleccionarProveedorParaProducto(idReq: string, idProducto: string, proveedorId: string) {
    this.markProductoProveedor(idReq, idProducto, proveedorId);
  }

  // Cuando todos los productos tienen proveedor, se puede aceptar
  puedeAceptar(idReq: string): Observable<boolean> {
    return this.requerimientos$.pipe(map(() => this.areAllProductosSelected(idReq)));
  }

  aceptarRequerimiento(idReq: string) {
    if (!this.areAllProductosSelected(idReq)) return;
    this.finalizeRequerimiento(idReq, 'aceptar');
  }

  cancelarRequerimiento(idReq: string) {
    this.finalizeRequerimiento(idReq, 'cancelar');
  }

  // --------- Popup: Proveedores disponibles para un producto ---------
  getProveedoresDisponiblesTabla(idProducto: string): Observable<PuntoVentaProductoRow[]> {
    return new BehaviorSubject(this.getStockByProducto(idProducto).map((s) => ({
      id_puntoVenta: s.id_puntoVenta,
      nombre_puntoVenta: s.nombre_puntoventa,
      id_producto: s.id_producto,
      nombre_producto: s.nombre_producto,
      stock_producto: s.stock_prod,
    }))).asObservable();
  }

  // Método auxiliar solicitado por un componente existente (si lo usa)
  getDisponibilidadProducto(): Observable<RequerimientoPendiente[]> {
    // Devuelve pendientes; si se necesita por ID, usar getProductosSolicitadosTabla(idReq)
    return this.getRequerimientosPendientes();
  }
}