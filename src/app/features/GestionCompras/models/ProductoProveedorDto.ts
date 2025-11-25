import {
  DetalleSolicitudCompraProductoResumenDto,
  ProveedorResumenDto
} from '../../GestionProgramacion/models/DetalleSolicitudCompraDto';

/**
 * DTO de lectura para las relaciones Producto-Proveedor.
 */
export interface ProductoProveedorDto {
  id: number;
  idProducto: DetalleSolicitudCompraProductoResumenDto;
  idProveedor: ProveedorResumenDto;
  precioReferencial: number;
  estado?: boolean;
}