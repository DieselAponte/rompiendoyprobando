import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DetalleSolicitudCompraDto } from '../../models/DetalleSolicitudCompraDto';

@Component({
  selector: 'app-popup-detalle-solicitud-de-compra',
  templateUrl: './popup-detalle-solicitud-de-compra.component.html',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  styleUrls: ['./popup-detalle-solicitud-de-compra.component.css']
})
export class PopupDetalleSolicitudDeCompraComponent {
  @Input() data: DetalleSolicitudCompraDto[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() atender = new EventEmitter<DetalleSolicitudCompraDto>();

  displayedColumns: string[] = [
    'id',
    'producto',
    'cantidadSolicitada',
    'proveedorSeleccionado',
    'precioReferencial',
    'estado'
  ];
}
