export interface DetalleTransporteDto {
  idDetalleDistribucion: number;
  idLote: number;
  cantidadTransportada: number;
  /** Campos legacy para UI previa */
  nombreProducto?: string;
  incidenciaReportada?: boolean;
}
