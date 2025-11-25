export interface IncidenciaTransporteCreateDto {
    idVehiculo: number;
    idOrdenDist: number;
    idDetalleDist?: number | null;
    tipoIncidencia: string;
    descripcion: string;
    impacto: string;
    idUsuarioReporta: number;
}

/**
 * Alias temporal para mantener la compatibilidad con el código existente.
 */
export type IncidenciaTransporteCreatePayload = IncidenciaTransporteCreateDto;