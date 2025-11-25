import type { LoteProductoDto } from './LoteProductoDto';

/**
 * Traslada el DTO IncidenciaLoteDto del backend.
 */
export interface IncidenciaLoteDto {
	id: number;
	idLote: LoteProductoDto;
	tipoIncidencia: string;
	descripcion?: string;
	estado?: string;
	fechaIncidencia?: string;
	idUsuarioRegistroNombreUsuario?: string;
}
