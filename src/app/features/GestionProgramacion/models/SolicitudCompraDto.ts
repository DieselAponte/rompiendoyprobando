export interface SolicitudCompraDto {
	id: number;
	fechaSolicitud: string;
	idRequerimientoId: number;
	estado?: string;
}
