import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DetalleOrdenDistribucionDto } from '../../models/DetalleOrdenDistribucionDto';

@Component({
	selector: 'app-orden-distribucion-table',
	standalone: true,
	imports: [CommonModule, MatTableModule, MatButtonModule],
	templateUrl: './orden-distribucion-table.component.html',
	styleUrls: ['./orden-distribucion-table.component.css']
})
export class OrdenDistribucionTableComponent {
	@Input() data: DetalleOrdenDistribucionDto[] = [];
	@Output() verDetalle = new EventEmitter<number>();

	displayedColumns: string[] = [
		'idOrdenDist',
		'idLote',
		'idProducto',
		'cantidad',
		'condicionesTransporte',
		'temperaturaRequerida',
		'observaciones',
		'fechaCreacion',
		'acciones'
	];

	onVerDetalle(row: DetalleOrdenDistribucionDto) {
		this.verDetalle.emit(row.idOrdenDist);
	}
}
