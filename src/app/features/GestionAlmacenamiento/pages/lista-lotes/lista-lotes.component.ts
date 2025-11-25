import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService } from '../../services/almacenamiento.service';
import { LoteProductoDto } from '../../models/LoteProductoDto';
import { InventarioDto } from '../../models/InventarioDto';
import { MovimientoInventarioDto } from '../../models/MovimientoInventarioDto';

@Component({
  selector: 'app-lista-lotes',
  templateUrl: './lista-lotes.component.html',
  standalone: false,
  styleUrls: ['./lista-lotes.component.css'],
})
export class ListaLotesComponent implements OnInit {
  lotesRecibidos: LoteProductoDto[] = [];
  lotesAtendidos: InventarioDto[] = [];

  reporteSeleccionado: MovimientoInventarioDto | null = null;

  constructor(private almacenamientoService: AlmacenamientoService) {}

  ngOnInit(): void {
    this.almacenamientoService.getLotesProducto().subscribe((data) => (this.lotesRecibidos = data));
    this.almacenamientoService
      .getLotesAtendidos()
      .subscribe((data) => (this.lotesAtendidos = data));
  }

  onRegistrarLote(lote: LoteProductoDto) {
    console.log('Registrar lote:', lote);
  }

  onVerReporte(item: InventarioDto) {
    this.almacenamientoService.getMovimientosInventario(item.id).subscribe((movimientos) => {
      if (movimientos.length > 0) {
        this.reporteSeleccionado = movimientos[0];
      } else {
        console.warn('No se encontró movimiento para el inventario:', item.id);
      }
    });
  }

  cerrarPopup() {
    this.reporteSeleccionado = null;
  }

  handleResolverIncidencia(codigoReporte: string) {
    // acción tras resolver incidencia (actualizar lista o cerrar popup)
    console.log('Incidencia resuelta para', codigoReporte);
    this.cerrarPopup();
  }
}
