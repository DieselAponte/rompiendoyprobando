import { SolicitudCompraCreateDto } from './SolicitudCompraCreateDto';

export interface ProgramacionRequestDto {
	idRequerimiento: number;
	tipo?: string;
	solicitudCompra?: SolicitudCompraCreateDto;
	detallesDistribucion: DetalleOrdenDistribucionCreateDto[];
}

// Placeholder until the distribution module exposes its DTO definition
export type DetalleOrdenDistribucionCreateDto = Record<string, unknown>;
