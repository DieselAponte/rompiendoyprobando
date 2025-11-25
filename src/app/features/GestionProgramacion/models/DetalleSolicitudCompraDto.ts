export interface DetalleSolicitudCompraDto {
  id: number;
  idProducto: DetalleSolicitudCompraProductoResumenDto;
  cantidadSolicitada: number;
  idProveedorSeleccionado: ProveedorResumenDto;
  precioReferencial?: number;
  estado?: string;
}

export interface DetalleSolicitudCompraProductoResumenDto {
  id: number;
  nombreProducto: string;
}

export interface ProveedorResumenDto {
  id: number;
  nombreProveedor: string;
}
