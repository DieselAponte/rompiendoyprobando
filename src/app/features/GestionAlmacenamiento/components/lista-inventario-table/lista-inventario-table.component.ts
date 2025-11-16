import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoteAlmacenado } from '../../services/almacenamiento.service';

@Component({
  selector: 'app-lista-inventario-table',
  templateUrl: './lista-inventario-table.component.html',
  standalone:false,
  styleUrls: ['./lista-inventario-table.component.css']
})
export class ListaInventarioTableComponent { 
  @Input() data: LoteAlmacenado[] = [];
  @Output() verReporte = new EventEmitter<LoteAlmacenado>();

  displayedColumns: string[] = [
    'id_lote', 'id_proveedor', 'id_orden_comp', 'id_producto',
    'cantidad', 'lote', 'fecha_caducidad', 'fecha_almacenamiento',
    'ubicacion'
  ];
}
