/**
 * DTO para Inventario con los resúmenes anidados de almacén y lote.
 */
export interface InventarioDto {
	id: number;
	idAlmacen: AlmacenResumenDto;
	idLote: LoteResumenDto;
	stockActual: number;
	stockMinimo?: number;
	ubicacionEspecifica?: string;
}

export interface AlmacenResumenDto {
	nombreAlmacen: string;
}

export interface LoteResumenDto {
	id: number;
	numeroLote: string;
	fechaVencimiento: string;
}
