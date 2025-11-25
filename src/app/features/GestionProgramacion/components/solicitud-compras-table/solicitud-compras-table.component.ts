import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DetalleSolicitudCompraDto } from '../../models/DetalleSolicitudCompraDto';

@Component({
	selector: 'app-solicitud-compras-table',
	standalone: true,
	imports: [CommonModule, MatTableModule, MatButtonModule],
	templateUrl: './solicitud-compras-table.component.html',
	styleUrls: ['./solicitud-compras-table.component.css']
})
export class SolicitudComprasTableComponent {
	@Input() data: DetalleSolicitudCompraDto[] = [];
	@Output() verDetalle = new EventEmitter<number>();

	displayedColumns: string[] = [
		'id',
		'producto',
		'cantidadSolicitada',
		'proveedorSeleccionado',
		'precioReferencial',
		'estado',
		'acciones'
	];

	onVerDetalle(row: DetalleSolicitudCompraDto) {
		this.verDetalle.emit(row.id);
	}
}
