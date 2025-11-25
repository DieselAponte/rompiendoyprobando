import { DetalleOrdenDistribucion } from '../DetalleOrdenDistribucionAsignacion.model';
import { SeguimientoVehiculo } from '../SeguimientoVehiculoDto';
import { OrdenReporte } from './ordenReporte.model';

export interface DetalleOrdenCompleta {
  orden: OrdenReporte;
  detallesLotes: DetalleOrdenDistribucion[];
  infoSeguimiento: SeguimientoVehiculo;
  justificacionCierre: string;
}
