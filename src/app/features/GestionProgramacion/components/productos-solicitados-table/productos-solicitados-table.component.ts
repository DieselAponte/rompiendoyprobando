import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductoSolicitadoRow } from '../../services/programacion.service';

@Component({
  selector: 'app-productos-solicitados-table',
  templateUrl: './productos-solicitados-table.component.html',
  standalone: false,
  styleUrls: ['./productos-solicitados-table.component.css']
})
export class ProductosSolicitadosTableComponent {
  @Input() data: ProductoSolicitadoRow[] = [];
  @Output() seleccionar = new EventEmitter<ProductoSolicitadoRow>();
  displayedColumns: string[] = ['id_prod','nombre','cantidad','proveedor_seleccionado','accion'];
}
// Interface ahora proviene del servicio (ProductoSolicitadoRow)
