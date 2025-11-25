export interface InventarioStockDto {
	idInventario: number;
	idLote: number;
	idProducto: number;
	numeroLote: string;
	fechaFabricacion: string;
	fechaVencimiento: string;
	stockActual: number;
	ubicacionAlmacen?: string;
	temperaturaAlmacenamiento?: string;
	fechaRegistro?: string;
}
