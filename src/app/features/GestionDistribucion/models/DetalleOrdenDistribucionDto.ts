import { LoteResumenDto } from '../../GestionAlmacenamiento/models/InventarioDto';
import { ProductoResumenDto } from '../../GestionProgramacion/models/DetalleRequerimientoDto';

export interface DetalleOrdenDistribucionDto {
    id: number;
    idLote: number | LoteResumenDto;
    idProducto: number | ProductoResumenDto;
    cantidad: number;
    estadoEntrega?: string;
}