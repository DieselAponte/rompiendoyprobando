import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OrdenCompraResumenDto } from '../../models/OrdenCompraResumenDto';

@Component({
  selector: 'app-ordenes-compra-table',
  standalone: false,
  templateUrl: './ordenes-compra-table.component.html',
  styleUrl: './ordenes-compra-table.component.css',
})
export class OrdenesCompraTableComponent {
  @Input() ordenes: OrdenCompraResumenDto[] | null = []; 

  // Columnas a mostrar
  displayedColumns: string[] = [
    'idOrden', 
    'idSolicitud', 
    'proveedorPrincipal', 
    'fechaGeneracion', 
    'montoTotal', 
    'estadoOC', 
    'accion' 
  ];

  // Evento que se emite al hacer clic en 'Ver Detalle'
  @Output() verDetalle = new EventEmitter<number>(); 

  onVerDetalle(idOrden: number): void {
    this.verDetalle.emit(idOrden);
  }

}
