import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface LoteRecibido {
  id_lote: string;
  id_proveedor: string;
  id_orden_comp: string;
  id_producto: string;
  cantidad: number;
  lote: string;
  fecha_caducidad: string;
}

export interface LoteAtendido extends LoteRecibido {
  fecha_registro: string;
  observaciones: string;
}

export interface LoteAlmacenado extends LoteRecibido {
  fecha_almacenamiento: string;
  ubicacion: string;
}

@Injectable({ providedIn: 'root' })
export class AlmacenamientoService {
  getLotesRecibidos(): Observable<LoteRecibido[]> {
    const data: LoteRecibido[] = [
      { id_lote: 'L001', id_proveedor: 'PROV001', id_orden_comp: 'PED001', id_producto: 'P001', cantidad: 100, lote: 'LOTE-ABC', fecha_caducidad: '2025-12-31' },
      { id_lote: 'L002', id_proveedor: 'PROV002', id_orden_comp: 'PED002', id_producto: 'P003', cantidad: 50, lote: 'LOTE-XYZ', fecha_caducidad: '2026-06-30' },
      { id_lote: 'L003', id_proveedor: 'PROV003', id_orden_comp: 'PED003', id_producto: 'P002', cantidad: 200, lote: 'LOTE-DEF', fecha_caducidad: '2025-09-15' }
    ];
    return of(data);
  }

  getLotesAtendidos(): Observable<LoteAtendido[]> {
    const data: LoteAtendido[] = [
      { id_lote: 'L001', id_proveedor: 'PROV001', id_orden_comp: 'PED001', id_producto: 'P001', cantidad: 100, lote: 'LOTE-ABC', fecha_caducidad: '2025-12-31', fecha_registro: '2024-10-28', observaciones: 'Buen estado al recibir.' },
      { id_lote: 'L002', id_proveedor: 'PROV002', id_orden_comp: 'PED002', id_producto: 'P003', cantidad: 50, lote: 'LOTE-XYZ', fecha_caducidad: '2026-06-30', fecha_registro: '2024-10-28', observaciones: 'Empaque sellado.' },
      { id_lote: 'L003', id_proveedor: 'PROV003', id_orden_comp: 'PED003', id_producto: 'P002', cantidad: 200, lote: 'LOTE-DEF', fecha_caducidad: '2025-09-15', fecha_registro: '2024-10-28', observaciones: 'Necesita refrigeración.' },
      { id_lote: 'L004', id_proveedor: 'PROV004', id_orden_comp: 'PED004', id_producto: 'P004', cantidad: 75, lote: 'LOTE-GHI', fecha_caducidad: '2027-03-20', fecha_registro: '2024-10-28', observaciones: 'Sin incidencias.' },
      { id_lote: 'L005', id_proveedor: 'PROV005', id_orden_comp: 'PED005', id_producto: 'P005', cantidad: 120, lote: 'LOTE-JKL', fecha_caducidad: '2025-11-10', fecha_registro: '2024-10-28', observaciones: 'Daño menor en una caja.' }
    ];
    return of(data);
  }

  getLotesAlmacenados(): Observable<LoteAlmacenado[]> {
    const data: LoteAlmacenado[] = [
      {id_lote: 'L001', id_proveedor: 'PROV001', id_orden_comp: 'PED001', id_producto: 'P001', cantidad: 100, lote: 'LOTE-ABC',fecha_caducidad:'2026-12-31' ,fecha_almacenamiento: '2025-12-31', ubicacion: 'Estante A1'},
      {id_lote: 'L001', id_proveedor: 'PROV001', id_orden_comp: 'PED001', id_producto: 'P001', cantidad: 100, lote: 'LOTE-ABC',fecha_caducidad:'2026-12-31' ,fecha_almacenamiento: '2025-12-31', ubicacion: 'Estante A1'},
      {id_lote: 'L001', id_proveedor: 'PROV001', id_orden_comp: 'PED001', id_producto: 'P001', cantidad: 100, lote: 'LOTE-ABC',fecha_caducidad:'2026-12-31' ,fecha_almacenamiento: '2025-12-31', ubicacion: 'Estante A1'},
      {id_lote: 'L001', id_proveedor: 'PROV001', id_orden_comp: 'PED001', id_producto: 'P001', cantidad: 100, lote: 'LOTE-ABC',fecha_caducidad:'2026-12-31' ,fecha_almacenamiento: '2025-12-31', ubicacion: 'Estante A1'},
      {id_lote: 'L001', id_proveedor: 'PROV001', id_orden_comp: 'PED001', id_producto: 'P001', cantidad: 100, lote: 'LOTE-ABC',fecha_caducidad:'2026-12-31' ,fecha_almacenamiento: '2025-12-31', ubicacion: 'Estante A1'},
      {id_lote: 'L001', id_proveedor: 'PROV001', id_orden_comp: 'PED001', id_producto: 'P001', cantidad: 100, lote: 'LOTE-ABC', fecha_caducidad: '2026-12-31', fecha_almacenamiento: '2025-12-31', ubicacion: 'Estante A1'}
    ];
    return of(data);
  }
}
