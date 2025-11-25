import type { ProductoResumenDto } from '../../GestionProgramacion/models/DetalleRequerimientoDto';

/**
 * DTO para LoteProducto tal como lo entrega el backend.
 */
export interface LoteProductoDto {
	id: number;
	idProducto: ProductoResumenDto;
	numeroLote: string;
	fechaVencimiento: string;
	cantidadInicial: number;
	cantidadActual: number;
	estado?: string;
}
