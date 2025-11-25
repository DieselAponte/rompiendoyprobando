import { OrdenDistribucion } from '../OrdenDistribucionDto';

export interface OrdenReporte extends OrdenDistribucion {
  tieneIncidencias: boolean;
  totalLotes: number;
}
