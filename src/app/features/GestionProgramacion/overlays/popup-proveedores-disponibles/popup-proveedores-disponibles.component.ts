import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PuntoVentaProductoRow } from '../../services/programacion.service';


@Component({
  selector: 'app-popup-proveedores-disponibles',
  templateUrl: './popup-proveedores-disponibles.component.html',
  standalone: false,
  styleUrls: ['./popup-proveedores-disponibles.component.css']
})
export class PopupProveedoresDisponiblesComponent {
  @Input() data: PuntoVentaProductoRow[] = [];
  @Output() seleccionarProveedor = new EventEmitter<PuntoVentaProductoRow>();
  @Output() close = new EventEmitter<void>();

  displayedColumns: string[] = [
    'id_puntoVenta',
    'nombre_puntoVenta',
    'id_producto',
    'nombre_producto',
    'stock_producto',
    'accion'
  ];
}

// Interface unificada: PuntoVentaProductoRow proviene del servicio
