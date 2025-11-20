import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-reporte-lote',
  templateUrl: './popup-reporte-lote.component.html',
  standalone: false,
  styleUrls: ['./popup-reporte-lote.component.css']
})
export class PopupReporteLoteComponent {
  @Input() reporte: any;
  @Output() close = new EventEmitter<void>();
  @Output() resolverIncidencia = new EventEmitter<string>();

  marcarComoResuelta() {
    if (this.reporte.incidencia) {
      this.reporte.incidencia.estado = 'Resuelta';
      this.resolverIncidencia.emit(this.reporte.codigoReporte);
    }
  }

  volver() {
    this.close.emit();
  }
}
