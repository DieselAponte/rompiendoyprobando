import { Component, OnInit } from '@angular/core';
import { AlmacenamientoService, LoteRecibido, LoteAtendido } from '../../services/almacenamiento.service';

@Component({
  selector: 'app-lista-lotes',
  templateUrl: './lista-lotes.component.html',
  standalone: false,
  styleUrls: ['./lista-lotes.component.css']
})
  
export class ListaLotesComponent implements OnInit {
  lotesRecibidos: LoteRecibido[] = [];
  lotesAtendidos: LoteAtendido[] = [];

  reporteSeleccionado: LoteAtendido | null = null;

  constructor(private almacenamientoService: AlmacenamientoService) {}

  ngOnInit(): void {
    this.almacenamientoService.getLotesRecibidos().subscribe(data => this.lotesRecibidos = data);
    this.almacenamientoService.getLotesAtendidos().subscribe(data => this.lotesAtendidos = data);
  }

  onRegistrarLote(lote: LoteRecibido) {
    console.log('Registrar lote:', lote);
  }

  onVerReporte(lote: LoteAtendido) {
    // abrir popup con el reporte seleccionado
    console.log('Ver reporte del lote:', lote);
    this.reporteSeleccionado = lote;
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
