import { Component, EventEmitter, Output } from '@angular/core';
import { AlmacenamientoService } from '../../services/almacenamiento.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-search-info-digemid',
  templateUrl: './search-info-digemid.component.html',
  styleUrls: ['./search-info-digemid.component.css'],
  standalone: false,
})
export class SearchInfoDigemidComponent {
  codigoDigemid: string = '';
  productoEncontrado: Producto | null = null;
  mensajeError: string = '';
  cantidadTexto: string = '';

  @Output() agregarProducto = new EventEmitter<{ producto: Producto; cantidad: number }>();

  buscando = false;

  constructor(private almacenamientoService: AlmacenamientoService) {}

  buscar(): void {
    this.mensajeError = '';
    this.productoEncontrado = null;
    if (!this.codigoDigemid || this.codigoDigemid.trim().length === 0) {
      this.mensajeError = 'Ingrese un código DIGEMID.';
      return;
    }
    this.buscando = true;
    this.almacenamientoService
      .getProductoPorCodigoDigemid(this.codigoDigemid.trim())
      .subscribe((prod) => {
        this.buscando = false;
        if (!prod) {
          this.mensajeError = 'Código digemid incorrecto o inexistente';
          return;
        }
        this.productoEncontrado = prod;
      });
  }

  agregar(): void {
    if (!this.productoEncontrado) {
      return;
    }
    const cantidad = Number(this.cantidadTexto);
    if (isNaN(cantidad) || cantidad <= 0) {
      this.mensajeError = 'Cantidad inválida.';
      return;
    }
    this.agregarProducto.emit({ producto: this.productoEncontrado, cantidad });
    // Limpia cantidad pero deja producto visible por si agregan más
    this.cantidadTexto = '';
  }
}
