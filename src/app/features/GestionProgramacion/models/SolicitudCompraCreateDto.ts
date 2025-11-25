import { DetalleSolicitudCompraCreateDto } from './DetalleSolicitudCompraCreateDto';

export interface SolicitudCompraCreateDto {
	idRequerimiento: number;
	idUsuarioSolicitante: number;
	motivo: string;
	detalles: DetalleSolicitudCompraCreateDto[];
}
