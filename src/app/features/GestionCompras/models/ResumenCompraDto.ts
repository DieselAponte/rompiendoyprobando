/**
 * DTO utilizado en el frontend para mostrar el resumen de productos en una Orden de Compra.
 */
export interface ResumenCompraDto {
  idProducto: number;
  nombreProducto: string;
  cantidadComprada: number;
  nombreProveedorFinal: string;
  precioUnitarioFinal: number;
  subtotal: number;
}
