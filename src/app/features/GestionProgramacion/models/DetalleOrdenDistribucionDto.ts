export interface DetalleOrdenDistribucionDto {
	idOrdenDist: number;
	idLote: number;
	idProducto: number;
	cantidad: number;
	condicionesTransporte?: string;
	temperaturaRequerida?: string;
	observaciones?: string;
	fechaCreacion?: string;
}
