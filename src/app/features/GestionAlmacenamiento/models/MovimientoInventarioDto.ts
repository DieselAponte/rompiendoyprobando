/**
 * DTO para movimientos de inventario (ingresos, salidas, ajustes, etc.).
 */
export interface MovimientoInventarioDto {
	id: number;
	tipoMovimiento: string;
	cantidad: number;
	fechaMovimiento?: string;
	idUsuarioRegistroNombreUsuario?: string;
	tipoReferencia?: string;
	observacion?: string;
}
