import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DetalleRequerimientoDto } from '../../models/DetalleRequerimientoDto';

@Component({
  selector: 'app-popup-detalle-de-requerimiento',
  templateUrl: './popup-detalle-de-requerimiento.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  styleUrls: ['./popup-detalle-de-requerimiento.component.css']
})
export class PopupDetalleDeRequerimientoComponent {
  @Input() data: DetalleRequerimientoDto[] = [];
  // Emite al padre para cerrar el popup
  @Output() close = new EventEmitter<void>();
  // (Opcional) evento para atender un item, si se requiere más adelante
  @Output() atender = new EventEmitter<DetalleRequerimientoDto>();
  
  displayedColumns: string[]=[
    'producto',
    'cantidad',
    'condiciones',
    'observacion'
  ];
}
