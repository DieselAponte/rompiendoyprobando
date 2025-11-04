import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoteRecibido } from '../../services/almacenamiento.service';

@Component({
  selector: 'app-lotes-recibidos-table',
  templateUrl: './lotes-recibidos-table.component.html',
  standalone: false,
  styleUrls: ['./lotes-recibidos-table.component.css']
})
export class LotesRecibidosTableComponent {
  @Input() data: LoteRecibido[] = [];
  @Output() registrarLote = new EventEmitter<LoteRecibido>();

  displayedColumns: string[] = [
    'id_lote', 'id_proveedor', 'id_orden_comp', 'id_producto',
    'cantidad', 'lote', 'fecha_caducidad', 'acciones'
  ];
}
