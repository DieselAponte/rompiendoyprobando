export interface DetalleRequerimientoDto {
	id: number;
	idProducto: ProductoResumenDto;
	cantidad: number;
	cantidadAtendida?: number;
	observacion?: string;
}

export interface ProductoResumenDto {
	id: number;
	nombreProducto: string;
	codigoDigemid?: string;
	idTipoNombreTipo?: string;
	idFormaNombreForma?: string;
	condicionesAlmacenamiento?: string;
}
