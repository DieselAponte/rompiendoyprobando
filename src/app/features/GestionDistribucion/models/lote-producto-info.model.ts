export interface LoteProductoInfo {
  idLote: number;
  idProducto: number;
  numeroLote: string;
  cantInicial: number;
  cantActual: number;
  fechaFabricacion: string;
  fechaVencimiento: string;
  estado: string;
}

export type LoteProducto = LoteProductoInfo;
