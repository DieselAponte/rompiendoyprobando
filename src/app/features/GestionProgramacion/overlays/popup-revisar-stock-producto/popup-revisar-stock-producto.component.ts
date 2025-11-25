import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { InventarioStockDto } from '../../models/InventarioStockDto';

@Component({
	selector: 'app-popup-revisar-stock-producto',
	standalone: true,
	imports: [CommonModule, MatTableModule, MatButtonModule],
	templateUrl: './popup-revisar-stock-producto.component.html',
	styleUrls: ['./popup-revisar-stock-producto.component.css']
})
export class PopupRevisarStockProductoComponent {
	@Input() nombreProducto = '';
	@Input() lotes: InventarioStockDto[] = [];
	@Output() close = new EventEmitter<void>();

	displayedColumns: string[] = [
		'numeroLote',
		'fechaFabricacion',
		'fechaVencimiento',
		'stockActual',
		'ubicacionAlmacen',
		'temperaturaAlmacenamiento',
		'fechaRegistro'
	];
}
