import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProgramacionService, RequerimientoAtendido, RequerimientoPendiente, RequerimientoRow} from '../../services/programacion.service';
import { DetalleRequerimiento } from '../../overlays/popup-detalle-de-requerimiento/popup-detalle-de-requerimiento.component';
@Component({
    selector: 'app-lista-requerimientos',
    templateUrl: './lista-requerimientos.component.html',
    standalone: false,
    styleUrls: ['./lista-requerimientos.component.css']
})

export class ListaRequerimientosComponent implements OnInit {
    // Datos de dominio (si se requieren en otra parte)
    requerimientosPendientes: RequerimientoPendiente[] = [];
    requerimientosAtendidos: RequerimientoAtendido[] = [];

    // Datos formateados para las tablas (coinciden con columnas de los componentes)
    requerimientosPendientesTabla: RequerimientoRow[] = [];
    requerimientosAtendidosTabla: RequerimientoRow[] = [];

    // Detalle para popup
    detalleSeleccionado: DetalleRequerimiento[] | null = null;
    
    constructor(private programacionService: ProgramacionService, private router: Router) {}
    ngOnInit(): void {
        // Mantener dominio (opcional)
        this.programacionService.getRequerimientosPendientes().subscribe(data => this.requerimientosPendientes = data);
        this.programacionService.getRequerimientosAtendidos().subscribe(data => this.requerimientosAtendidos = data);

        // Proveer a las tablas exactamente el shape que esperan
        this.programacionService.getRequerimientosPendientesTabla().subscribe(rows => this.requerimientosPendientesTabla = rows);
        this.programacionService.getRequerimientosAtendidosTabla().subscribe(rows => this.requerimientosAtendidosTabla = rows);
    } 

    onAtenderRequerimiento(requerimiento: RequerimientoRow) {
        // Navegar a la vista de disponibilidad con el id_req
        this.router.navigate(['/GestionProgramacion/disponibilidad-producto', requerimiento.id_req]);
    }

    onVerDetalleRequerimiento(row: RequerimientoRow) {
        // Recuperar el objeto de dominio para obtener productos y proveedor seleccionado
        const dominio = this.programacionService.getRequerimientoById(row.id_req) as RequerimientoAtendido | undefined;
        if (!dominio || (dominio.status_req !== 'atendido' && dominio.status_req !== 'cancelado')) {
            this.detalleSeleccionado = null;
            return;
        }
        this.detalleSeleccionado = (dominio.productos || []).map(p => ({
            id_product: p.id_producto,
            nombre_producto: p.nombre,
            cantidad_producto: p.cantidad,
            proveedor_producto: p.proveedorSeleccionado || ''
        }));
    }

    cerrarPopupDetalle() {
        this.detalleSeleccionado = null;
    }
}