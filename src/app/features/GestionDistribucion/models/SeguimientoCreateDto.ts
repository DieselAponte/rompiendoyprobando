import { DetalleTransporteCreateDto } from './DetalleTransporteCreateDto';

export interface SeguimientoCreateDto {
    idVehiculo: number;
    idOrdenDist: number;
    ubicacionActual: string;
    proximoDestino: string;
    estimadoLlegada: string;
    idUsuarioActualizacion: number;
    detallesTransporte: DetalleTransporteCreateDto[];
}