import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoteAtendido } from '../../services/almacenamiento.service';

@Component({
  selector: 'app-lotes-atendidos-table',
  templateUrl: './lotes-atendidos-table.component.html',
  standalone:false,
  styleUrls: ['./lotes-atendidos-table.component.css']
})
export class LotesAtendidosTableComponent {
  @Input() data: LoteAtendido[] = [];
  @Output() verReporte = new EventEmitter<LoteAtendido>();

  displayedColumns: string[] = [
    'id_lote', 'id_proveedor', 'id_orden_comp', 'id_producto',
    'cantidad', 'lote', 'fecha_caducidad', 'fecha_registro',
    'observaciones', 'acciones'
  ];
}
