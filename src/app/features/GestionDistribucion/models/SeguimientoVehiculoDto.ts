export interface SeguimientoVehiculoDto {
	id: number;
	idVehiculo: VehiculoResumenDto;
	idOrdenDistId: number;
	estadoActual: string;
	ubicacionActual: string;
	fechaHoraActualizacion: string;
	proximoDestino: string;
	estimadoLlegada?: string;
	/** Legacy fields usados por la UI mientras se completa la migración */
	idSeguimiento: number;
	idOrden: number;
	idVehiculoLegacy: number;
	placaVehiculo: string;
}

export interface VehiculoResumenDto {
	id: number;
	placa: string;
}

export type SeguimientoVehiculo = SeguimientoVehiculoDto;
