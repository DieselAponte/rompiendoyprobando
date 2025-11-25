export interface VehiculoDto {
	id: number;
	placa: string;
	marca?: string;
	modelo?: string;
	tipoVehiculo?: string;
	estado?: string;
}

/**
 * Modelo legacy usado por la UI hasta migrar completamente al DTO.
 */
export interface Vehiculo extends VehiculoDto {
	idVehiculo?: number;
	capacidad?: number;
	condicionTransporte?: string;
	disponible?: boolean;
}
