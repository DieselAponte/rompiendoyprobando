import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AlmacenamientoService } from '../../services/almacenamiento.service';
import { ProductoResumenDto } from '../../GestionProgramacion/models/DetalleRequerimientoDto';

@Component({
  selector: 'app-search-info-despacho',
  templateUrl: './search-info-despacho.component.html',
  styleUrls: ['./search-info-despacho.component.css'],
  standalone: false,
})
export class SearchInfoDespachoComponent implements OnChanges {
  term: string = '';
  productos: ProductoResumenDto[] = [];
  noResults = false;

  displayedColumns: string[] = [
    'id',
    'nombre',
    'codigo',
    'forma',
    'tipo',
    'almacenamiento',
  ];

  @Input() initialCode: string | null = null;
  @Output() productosEncontrados = new EventEmitter<ProductoResumenDto[]>();

  constructor(private almacenamientoService: AlmacenamientoService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialCode'] && this.initialCode) {
      this.term = this.initialCode;
      this.buscar(this.term);
    }
  }

  onInput(value: string) {
    this.term = value.trim();
    this.buscar(this.term);
  }

  private buscar(code: string) {
    if (!code) {
      this.productos = [];
      this.noResults = false;
      this.productosEncontrados.emit([]);
      return;
    }
    this.almacenamientoService.getProductosPorInventarioOIdLote(code).subscribe((list) => {
      this.productos = list;
      this.noResults = list.length === 0;
      this.productosEncontrados.emit(list);
    });
  }
}
