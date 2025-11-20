import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-popup-detalle-de-requerimiento',
  templateUrl: './popup-detalle-de-requerimiento.component.html',
  standalone: false,
  styleUrls: ['./popup-detalle-de-requerimiento.component.css']
})
export class PopupDetalleDeRequerimientoComponent {
  @Input() data: DetalleRequerimiento[] = [];
  // Emite al padre para cerrar el popup
  @Output() close = new EventEmitter<void>();
  // (Opcional) evento para atender un item, si se requiere más adelante
  @Output() atender = new EventEmitter<DetalleRequerimiento>();
  
  displayedColumns: string[]=[
    'id_product',
    'nombre_producto',
    'cantidad_producto',
    'proveedor_producto'
  ];
}

  export interface DetalleRequerimiento {
    id_product: string;
    nombre_producto: string;
    cantidad_producto: number;
    proveedor_producto: string;
  }
