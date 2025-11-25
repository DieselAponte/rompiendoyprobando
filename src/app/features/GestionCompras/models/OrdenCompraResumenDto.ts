/**
 * DTO para mostrar información resumida de Órdenes de Compra.
 */
export interface OrdenCompraResumenDto {
  idOrden: number;
  idSolicitud: number;
  proveedorPrincipal: string;
  fechaGeneracion: string;
  montoTotal: number;
  estadoOC: 'Generada' | 'Enviada' | 'Recibida Parcial' | 'Completada' | 'Cancelada';
}
