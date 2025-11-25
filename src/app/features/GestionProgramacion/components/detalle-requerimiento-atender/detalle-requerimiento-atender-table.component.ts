import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DetalleRequerimientoDecision } from '../../services/programacion.service';

@Component({
  selector: 'app-detalle-requerimiento-atender-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './detalle-requerimiento-atender-table.component.html',
  styleUrls: ['./detalle-requerimiento-atender-table.component.css']
})
export class DetalleRequerimientoAtenderTableComponent {
  @Input() data: DetalleRequerimientoDecision[] = [];
  @Input() observaciones = '';
  @Output() observacionesChange = new EventEmitter<string>();
  @Output() atender = new EventEmitter<{ productos: DetalleRequerimientoDecision[]; observaciones: string }>();
  @Output() revisarStock = new EventEmitter<DetalleRequerimientoDecision>();
  @Output() volver = new EventEmitter<void>();

  displayedColumns: string[] = [
    'revisar',
    'producto',
    'cantidad',
    'condiciones',
    'observacion',
    'decision'
  ];

  onDecisionChange() {}

  todasDecisionesTomadas(): boolean {
    return this.data.length > 0 && this.data.every(p => !!p.decision);
  }

  emitirAtender() {
    if (this.todasDecisionesTomadas()) {
      this.atender.emit({ productos: this.data, observaciones: this.observaciones });
    }
  }
}
