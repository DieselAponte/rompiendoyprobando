/**
 * DTO temporal para mostrar solicitudes de compra en la UI de Compras.
 */
export interface SolicitudCompraResumenDto {
  idSolicitud: number;
  area: string;
  solicitante: string;
  fechaCreacion: string;
  estado: 'Pendiente' | 'Aprobada' | 'Rechazada' | 'En Cotización';
  motivo: string;
}
