export interface RequerimientoResumenDto {
	id: number;
	fechaSolicitud: string;
	idDepartamentoNombreDepartamento?: string;
	prioridad?: string;
	estado?: string;
}
