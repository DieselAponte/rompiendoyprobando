/**
 * Payload que describe una nueva incidencia detectada en un lote.
 */
export interface IncidenciaLoteCreateDto {
	idLote: number;
	idOrdenCompra: number;
	tipoIncidencia: string;
	descripcion?: string;
	nivelSeveridad: string;
	idUsuarioRegistro: number;
}
