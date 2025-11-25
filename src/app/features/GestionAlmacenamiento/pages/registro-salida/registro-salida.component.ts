import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoResumenDto } from '../../../GestionProgramacion/models/DetalleRequerimientoDto';

@Component({
  selector: 'app-registro-salida',
  templateUrl: './registro-salida.component.html',
  styleUrls: ['./registro-salida.component.css'],
  standalone: false,
})
export class RegistroSalidaComponent implements OnInit {
  productos: ProductoResumenDto[] = [];
  inventarioParam: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.inventarioParam = this.route.snapshot.queryParamMap.get('inventario');
  }
}
