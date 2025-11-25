import { Component, OnInit } from '@angular/core';
import { ProgramacionService } from '../../services/programacion.service';
import { DetalleOrdenDistribucionDto } from '../../models/DetalleOrdenDistribucionDto';
import { DetalleSolicitudCompraDto } from '../../models/DetalleSolicitudCompraDto';

type ModoTabla = 'DISTRIBUCION' | 'COMPRAS';

import { CommonModule } from '@angular/common';
import { SearchBarAtendidosComponent } from '../../components/search-bar-atendidos/search-bar-atendidos.component';
import { OrdenDistribucionTableComponent } from '../../components/orden-distribucion-table/orden-distribucion-table.component';
import { SolicitudComprasTableComponent } from '../../components/solicitud-compras-table/solicitud-compras-table.component';
import { PopupDetalleOrdenDistribucionComponent } from '../../overlays/popup-detalle-de-ordenDistribucion/popup-detalle-ordenDistribucion.component';
import { PopupDetalleSolicitudDeCompraComponent } from '../../overlays/popup-detalle-solicitud-de-compra/popup-detalle-solicitud-de-compra.component';
@Component({
  selector: 'app-lista-requerimientos-atendidos',
  standalone: true,
  imports: [CommonModule, SearchBarAtendidosComponent, OrdenDistribucionTableComponent, SolicitudComprasTableComponent, PopupDetalleOrdenDistribucionComponent, PopupDetalleSolicitudDeCompraComponent],
  templateUrl: './lista-requerimientos-atendidos.component.html',
  styleUrls: ['./lista-requerimientos-atendidos.component.css']
})
export class ListaRequerimientosAtendidosComponent implements OnInit {
  currentMode: ModoTabla = 'DISTRIBUCION';
  ordenDataOriginal: DetalleOrdenDistribucionDto[] = [];
  solicitudDataOriginal: DetalleSolicitudCompraDto[] = [];
  filteredOrdenData: DetalleOrdenDistribucionDto[] = [];
  filteredSolicitudData: DetalleSolicitudCompraDto[] = [];

  showPopupDistribucion = false;
  distribucionDetalle: DetalleOrdenDistribucionDto[] = [];
  showPopupSolicitud = false;
  solicitudDetalle: DetalleSolicitudCompraDto[] = [];

  constructor(private programacionService: ProgramacionService) {}

  ngOnInit(): void {
    this.programacionService.getOrdenDistribucion().subscribe(data => {
      this.ordenDataOriginal = data;
      if (this.currentMode === 'DISTRIBUCION') this.applyFilter('', this.currentMode);
    });
    this.programacionService.getSolicitudCompra().subscribe(data => {
      this.solicitudDataOriginal = data;
      if (this.currentMode === 'COMPRAS') this.applyFilter('', this.currentMode);
    });
  }

  onFilter(evt: { term: string; modo: ModoTabla }) {
    this.currentMode = evt.modo;
    this.applyFilter(evt.term, evt.modo);
  }

  private applyFilter(term: string, modo: ModoTabla) {
    const normalized = term.trim().toLowerCase();
    if (modo === 'DISTRIBUCION') {
      this.filteredOrdenData = this.ordenDataOriginal.filter(r => !normalized || `${r.idOrdenDist}`.toLowerCase().includes(normalized));
    } else {
      this.filteredSolicitudData = this.solicitudDataOriginal.filter(r => !normalized || `${r.id}`.toLowerCase().includes(normalized));
    }
  }

  openDistribucion(id: number) {
    this.distribucionDetalle = this.programacionService.getOrdenDistribucionById(String(id));
    this.showPopupDistribucion = true;
  }

  openSolicitud(id: number) {
    this.solicitudDetalle = this.programacionService.getSolicitudCompraById(String(id));
    this.showPopupSolicitud = true;
  }
}
