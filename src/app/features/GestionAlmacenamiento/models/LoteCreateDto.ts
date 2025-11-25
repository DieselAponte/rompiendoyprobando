/**
 * DTO usado para registrar un nuevo lote recibido en almacén.
 */
export interface LoteCreateDto {
	idProducto: number;
	idOrdenCompra?: number;
	numeroLote: string;
	fechaFabricacion?: string;
	fechaVencimiento?: string;
	cantidadInicial: number;
	idAlmacen: number;
	ubicacionEspecifica?: string;
}
