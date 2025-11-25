import { DetalleOrdenCompraCreateDto } from './DetalleOrdenCompraCreateDto';

/**
 * DTO principal para registrar una nueva Orden de Compra.
 */
export interface OrdenCompraCreateDto {
  idSolicitud: number;
  idProveedor: number;
  numeroOrden: string;
  fechaEntregaEstimada: string;
  observaciones?: string;
  detalles: DetalleOrdenCompraCreateDto[];
}