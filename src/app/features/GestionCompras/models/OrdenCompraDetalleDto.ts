import { OrdenCompraResumenDto } from './OrdenCompraResumenDto';
import { ResumenCompraDto } from './ResumenCompraDto';

/**
 * DTO que representa el detalle completo de una Orden de Compra para visualización.
 */
export interface OrdenCompraDetalleDto {
  resumen: OrdenCompraResumenDto;
  productos: ResumenCompraDto[];
  justificacion: string;
}
