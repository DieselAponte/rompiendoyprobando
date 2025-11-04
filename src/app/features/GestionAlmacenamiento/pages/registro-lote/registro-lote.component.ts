import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenamientoService, LoteRecibido } from '../../services/almacenamiento.service';

@Component({
  selector: 'app-registro-lote',
  templateUrl: './registro-lote.component.html',
  standalone: false,
  styleUrls: ['./registro-lote.component.css']
})
export class RegistroLoteComponent implements OnInit {
  lote?: LoteRecibido;
  observaciones: string = 'Ingrese las observaciones que tuvo respecto a la recepción del paquete ...';
  // controla la visibilidad del popup de registro de incidencia
  mostrarPopupIncidencia = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private almacenamientoService: AlmacenamientoService
  ) {}

  ngOnInit(): void {
    const loteId = this.route.snapshot.paramMap.get('id');
    this.almacenamientoService.getLotesRecibidos().subscribe(lotes => {
      this.lote = lotes.find(l => l.id_lote === loteId);
    });
  }

  volver(): void {
    this.router.navigate(['/GestionAlmacenamiento']);
  }

  registrarConIncidencia(): void {
    // Abrir el popup para registrar una incidencia relacionada al lote actual
    console.log('Abriendo popup de registro de incidencia para:', this.lote);
    this.mostrarPopupIncidencia = true;
  }

  cerrarPopupIncidencia(): void {
    this.mostrarPopupIncidencia = false;
  }

  handleRegistrarIncidencia(incidencia: any): void {
    // Aquí puedes llamar al servicio para persistir la incidencia si lo deseas
    console.log('Incidencia recibida desde popup:', incidencia);
    // Cerrar popup tras registrar
    this.cerrarPopupIncidencia();
    // Después de registrar la incidencia redirigimos a la lista de lotes
    try {
      this.router.navigate(['/GestionAlmacenamiento']);
    } catch (err) {
      console.error('Error navegando a Lista de Lotes:', err);
    }
  }

  registrarRecepcion(): void {
    console.log('Registro exitoso del lote:', this.lote);
    this.router.navigate(['/GestionAlmacenamiento']);
  }
}
