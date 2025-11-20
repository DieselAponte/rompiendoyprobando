import { Component, OnInit } from '@angular/core';
import {LoteAlmacenado} from '../../services/almacenamiento.service';
import {AlmacenamientoService} from '../../services/almacenamiento.service';


@Component({
  selector: 'app-lista-inventario',
  standalone: false,
  templateUrl: './lista-inventario.component.html',
  styleUrls: ['./lista-inventario.component.css'],
})
export class ListaInventarioComponent implements OnInit {
  lotesAlmacenados: LoteAlmacenado[] = [];

  constructor(private almacenamientoService: AlmacenamientoService) {}

  ngOnInit(): void {
    this.almacenamientoService.getLotesAlmacenados().subscribe(data => this.lotesAlmacenados = data);
  }
}
