import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventarioDto } from '../../models/InventarioDto';

@Component({
  selector: 'app-lotes-atendidos-table',
  templateUrl: './lotes-atendidos-table.component.html',
  standalone: false,
  styleUrls: ['./lotes-atendidos-table.component.css'],
})
export class LotesAtendidosTableComponent {
  @Input() data: InventarioDto[] = [];
  @Output() verReporte = new EventEmitter<InventarioDto>();

  displayedColumns: string[] = [
    'id',
    'almacen',
    'numeroLote',
    'stockActual',
    'stockMinimo',
    'fechaVencimiento',
    'ubicacion',
    'acciones',
  ];
}
