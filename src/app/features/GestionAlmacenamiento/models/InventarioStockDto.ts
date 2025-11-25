/**
 * DTO resumido para consultar stock disponible por almacén y lote.
 */
export interface InventarioStockDto {
	idAlmacen: InventarioStockAlmacenResumenDto;
	idLote: InventarioStockLoteResumenDto;
	stockActual: number;
}

export interface InventarioStockAlmacenResumenDto {
	nombreAlmacen: string;
}

export interface InventarioStockLoteResumenDto {
	id: number;
	numeroLote: string;
	fechaVencimiento: string;
}
