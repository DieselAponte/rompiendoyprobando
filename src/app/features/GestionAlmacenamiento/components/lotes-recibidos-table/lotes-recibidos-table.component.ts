import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoteProductoDto } from '../../models/LoteProductoDto';

@Component({
  selector: 'app-lotes-recibidos-table',
  templateUrl: './lotes-recibidos-table.component.html',
  standalone: false,
  styleUrls: ['./lotes-recibidos-table.component.css'],
})
export class LotesRecibidosTableComponent {
  @Input() data: LoteProductoDto[] = [];
  @Output() registrarLote = new EventEmitter<LoteProductoDto>();

  displayedColumns: string[] = [
    'id',
    'producto',
    'numeroLote',
    'fechaVencimiento',
    'cantidadInicial',
    'cantidadActual',
    'estado',
    'acciones',
  ];
}
