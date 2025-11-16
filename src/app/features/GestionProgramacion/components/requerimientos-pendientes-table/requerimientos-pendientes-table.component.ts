import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RequerimientoRow } from '../../services/programacion.service';

@Component({
  selector: 'app-requerimientos-pendientes-table',
  templateUrl: './requerimientos-pendientes-table.component.html',
  standalone: false,
  styleUrls: ['./requerimientos-pendientes-table.component.css']
})
export class RequerimientosPendientesTableComponent {
  // Usa el DTO unificado desde el servicio
  @Input() data: RequerimientoRow[] = [];
  @Output() atender = new EventEmitter<RequerimientoRow>();

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
