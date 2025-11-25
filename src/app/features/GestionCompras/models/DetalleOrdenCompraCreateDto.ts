/**
 * DTO para los detalles incluidos al crear una Orden de Compra.
 */
export interface DetalleOrdenCompraCreateDto {
  idDetalleSolicitud: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
}