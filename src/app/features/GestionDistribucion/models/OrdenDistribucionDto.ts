export interface OrdenDistribucionDto {
  id: number;
  fechaDistribucion: string;
  idRequerimiento: number;
  estado: string;
  prioridad: string;
  /** Campos legacy que se eliminarán tras migrar componentes */
  idOrden?: number;
  fechaEntregaEstimada?: string;
  nombreUsuario?: string;
  area?: string;
}

export type OrdenDistribucion = OrdenDistribucionDto;