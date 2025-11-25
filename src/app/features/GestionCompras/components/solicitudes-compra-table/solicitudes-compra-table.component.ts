import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { SolicitudCompraResumenDto } from '../../models/SolicitudCompraResumenDto';


@Component({
  selector: 'app-solicitudes-compra-table',
  standalone: false,
  templateUrl: './solicitudes-compra-table.component.html',
  styleUrl: './solicitudes-compra-table.component.css',
})
export class SolicitudesCompraTableComponent {
  @Input() solicitudes: SolicitudCompraResumenDto[] | null = null;
  @Output() cotizar = new EventEmitter<SolicitudCompraResumenDto>();

  displayedColumns: string[] = [
    'idSolicitud', 
    'area', 
    'solicitante', 
    'fechaCreacion', 
    'estado',
    'motivo', 
    'accion'
  ];

  onCotizar(solicitud: SolicitudCompraResumenDto): void {
    this.cotizar.emit(solicitud);
  }

  
}
