/**
 * DTO usado para registrar un ajuste directo sobre el inventario (lote + almacén).
 * Refleja el record AjusteInventarioDto del backend.
 */
export interface AjusteInventarioDto {
	idInventario: number;
	cantidad: number;
	tipoMovimiento: string;
	observacion?: string;
	idUsuarioRegistro: number;
}
