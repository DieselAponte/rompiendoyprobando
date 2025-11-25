import { Component } from '@angular/core';
import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ProveedorDto } from '../../models/ProveedorDto';

@Component({
  selector: 'app-proveedores-table',
  standalone: false,
  templateUrl: './proveedores-table.component.html',
  styleUrl: './proveedores-table.component.css',
})
export class ProveedoresTableComponent {
  @Input() proveedores: ProveedorDto[] | null = []; 

  // Columnas a mostrar
  displayedColumns: string[] = [
    'id', 
    'nombreProveedor', 
    'ruc', 
    'telefono', 
    'correo', 
    'estado', 
    'modificar', 
    'eliminar'
  ];

  // Eventos de salida
  @Output() editar = new EventEmitter<ProveedorDto>(); 
  @Output() eliminar = new EventEmitter<ProveedorDto>(); 

  /**
   * Emite el proveedor a editar.
   */
  onEditar(proveedor: ProveedorDto): void {
    this.editar.emit(proveedor);
  }

  /**
   * Emite el proveedor a eliminar.
   */
  onEliminar(proveedor: ProveedorDto): void {
    this.eliminar.emit(proveedor);
  }

}
