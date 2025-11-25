/**
 * DTO para registrar la relación producto-proveedor desde Compras.
 */
export interface ProductoProveedorCreateDto {
  idProducto: number;
  idProveedor: number;
  precioReferencial: number;
}