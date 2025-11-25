import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RequerimientoResumenDto } from '../../models/RequerimientoResumenDto';

@Component({
  selector: 'app-requerimientos-pendientes-table',
  templateUrl: './requerimientos-pendientes-table.component.html',
  standalone: false,
  styleUrls: ['./requerimientos-pendientes-table.component.css']
})
export class RequerimientosPendientesTableComponent {
  @Input() data: RequerimientoResumenDto[] = [];

  displayedColumns: string[] = [
    'id',
    'fechaSolicitud',
    'departamento',
    'prioridad',
    'estado',
    'accion'
  ];

  constructor(private router: Router) {}

  atender(row: RequerimientoResumenDto) {
    this.router.navigate(['/GestionProgramacion/disponibilidad-producto/', row.id]);
  }
}
