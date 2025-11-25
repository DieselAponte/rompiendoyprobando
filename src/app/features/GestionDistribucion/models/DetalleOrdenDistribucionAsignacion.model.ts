import { VehiculoDto } from './VehiculoDto';

/**
 * Modelo auxiliar para la UI de asignación de vehículos.
 */
export interface DetalleOrdenDistribucionAsignacion {
  idLote: number;
  nombreProducto: string;
  cantidadProducto: number;
  condicionTransporteRequerida: string;
  idVehiculoAsignado: number | null;
  opcionesVehiculo: VehiculoDto[];
}

/**
 * Alias temporal para mantener compatibilidad con el código existente.
 */
export type DetalleOrdenDistribucion = DetalleOrdenDistribucionAsignacion;
