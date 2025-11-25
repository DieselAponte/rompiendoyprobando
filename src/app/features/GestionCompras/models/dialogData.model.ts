import { ProductoCotizacion } from '../../../core/models/producto.model';
import { ProductoProveedorDto } from './ProductoProveedorDto';


export interface PopupProveedorProductoData {
  producto: ProductoCotizacion; // El producto para el que buscamos proveedores
}

export interface PopupProveedorProductoResult {
  proveedorSeleccionado: ProductoProveedorDto;
}