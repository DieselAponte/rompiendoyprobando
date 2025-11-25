export interface IncidenciaReporte {
  idIncidencia: number;
  idOrden: number;
  idVehiculo: number;
  idDetalleDist: number | null;
  tipoIncidencia: string;
  descripcion: string;
  impacto: 'Bajo' | 'Moderado' | 'Alto';
  fechaReporte: string | Date;
  usuarioReporta: string;
}
