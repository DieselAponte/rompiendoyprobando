import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ProductoProveedorDto } from '../../models/ProductoProveedorDto';

@Component({
  selector: 'app-proveedores-productos-table',
  standalone: false,
  templateUrl: './proveedores-productos-table.component.html',
  styleUrl: './proveedores-productos-table.component.css',
})
export class ProveedoresProductosTableComponent {

  @Input() proveedores: ProductoProveedorDto[] | null = [];
  displayedColumns: string[] = [
    'nombreProveedor', 
    'precioReferencial',  
    'accion' // Botón de acción 'Seleccionar'
  ];

  @Output() seleccionar = new EventEmitter<ProductoProveedorDto>();

  /**
   * Emite el objeto ProductoProveedorDto seleccionado.
   * @param proveedor El objeto completo del proveedor seleccionado.
   */
  onSeleccionar(proveedor: ProductoProveedorDto): void {
    this.seleccionar.emit(proveedor);
  }
}
