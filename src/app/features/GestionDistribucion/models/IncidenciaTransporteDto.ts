export interface IncidenciaTransporteDto {
	id: number;
	idOrdenDist: number;
	idVehiculo: number;
	idDetalleDist?: number | null;
	tipoIncidencia: string;
	descripcion: string;
	impacto: string;
	fechaReporte: string;
	usuarioReporta?: string;
}