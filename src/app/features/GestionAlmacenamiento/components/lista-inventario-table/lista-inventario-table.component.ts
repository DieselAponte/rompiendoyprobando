import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventarioDto } from '../../models/InventarioDto';

@Component({
  selector: 'app-lista-inventario-table',
  templateUrl: './lista-inventario-table.component.html',
  standalone: false,
  styleUrls: ['./lista-inventario-table.component.css'],
})
export class ListaInventarioTableComponent {
  @Input() data: InventarioDto[] = [];
  @Output() selectedChange = new EventEmitter<InventarioDto | null>();
  @Output() verReporte = new EventEmitter<InventarioDto>();

  displayedColumns: string[] = [
    'id',
    'almacen',
    'lote',
    'numeroLote',
    'stockActual',
    'stockMinimo',
    'fechaVencimiento',
    'ubicacion',
    'reporte',
    'acciones',
  ];

  private selectedId: number | null = null;

  isSelected(row: InventarioDto): boolean {
    return this.selectedId === row.id;
  }

  toggleSelection(row: InventarioDto): void {
    if (this.isSelected(row)) {
      this.selectedId = null;
      this.selectedChange.emit(null);
    } else {
      this.selectedId = row.id;
      this.selectedChange.emit(row);
    }
  }

  verReporteLote(row: InventarioDto): void {
    this.verReporte.emit(row);
  }
}
