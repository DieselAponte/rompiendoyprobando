import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RequerimientoRow } from '../../services/programacion.service';


@Component({
  selector: 'app-requerimientos-atendidos-table',
  templateUrl: './requerimientos-atendidos-table.component.html',
  standalone: false,
  styleUrls: ['./requerimientos-atendidos-table.component.css']
})
export class RequerimientosAtendidosTableComponent  {
  @Input() data: RequerimientoRow[] = [];
  @Output() verDetalle = new EventEmitter<RequerimientoRow>();

  displayedColumns: string[] = [
    'id_req',
    'id_usr',
    'id_dep',
    'fecha_emision',
    'descripcion',
    'prioridad',
    'estado',
    'accion'
  ];
}