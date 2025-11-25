export interface IncidenciaDialogData {
  idVehiculo: number;
  idOrdenDist: number;
  idUsuarioReporta: number;
  idDetalleDist?: number | null;
  lotesDisponibles: number[];
}

export interface IncidenciaDialogResult {
  success: boolean;
}
