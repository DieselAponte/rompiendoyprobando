/**
 * DTO para actualizar el precio referencial de una relación producto-proveedor.
 */
export interface ProductoProveedorUpdateDto {
  idProductoProveedor: number;
  nuevoPrecio: number;
}