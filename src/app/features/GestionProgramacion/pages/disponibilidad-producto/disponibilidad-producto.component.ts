import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProgramacionService, RequerimientoPendiente, ProductoSolicitadoRow, PuntoVentaProductoRow} from '../../services/programacion.service';

@Component({
    selector: 'app-disponibilidad-producto',
    templateUrl: './disponibilidad-producto.component.html',
    standalone: false,
    styleUrls: ['./disponibilidad-producto.component.css']
})

export class DisponibilidadProductoComponent implements OnInit {
    // Requerimiento seleccionado (id)
    reqIdActual: string | null = null;

    // Tabla de productos solicitados para el requerimiento actual
    productosSolicitadosTabla: ProductoSolicitadoRow[] = [];

    // Habilitar botón Aceptar cuando todos los productos tengan proveedor
    puedeAceptarActual = false;

    // Popup proveedores
    mostrarPopupProveedores = false;
    proveedoresDisponibles: PuntoVentaProductoRow[] = [];
    productoSeleccionado: ProductoSolicitadoRow | null = null;

    constructor(private programacionService: ProgramacionService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        // Intentar obtener el id desde la ruta
        const idFromRoute = this.route.snapshot.paramMap.get('id');
        if (idFromRoute) {
            this.reqIdActual = idFromRoute;
            this.cargarProductos(idFromRoute);
            this.suscribirPuedeAceptar(idFromRoute);
            return;
        }
        // Fallback: tomar el primero pendiente si no hay parámetro
        this.programacionService.getDisponibilidadProducto().subscribe((pendientes: RequerimientoPendiente[]) => {
            if (!this.reqIdActual && pendientes.length) {
                this.reqIdActual = pendientes[0].id_req;
                this.cargarProductos(this.reqIdActual);
                this.suscribirPuedeAceptar(this.reqIdActual);
            }
        });
    }

    private cargarProductos(idReq: string) {
        this.programacionService.getProductosSolicitadosTabla(idReq).subscribe(rows => this.productosSolicitadosTabla = rows);
    }

    private suscribirPuedeAceptar(idReq: string) {
        this.programacionService.puedeAceptar(idReq).subscribe(flag => this.puedeAceptarActual = flag);
    }

    volver() {
        history.back();
    }

    rechazar() {
        if (this.reqIdActual) {
            this.programacionService.cancelarRequerimiento(this.reqIdActual);
        }
        this.volver();
    }

    Aceptar() {
        if (this.reqIdActual) {
            this.programacionService.aceptarRequerimiento(this.reqIdActual);
        }
        this.volver();
    }

    // --- Interacciones de selección de proveedor ---
    onSeleccionarProducto(prod: ProductoSolicitadoRow) {
        if (!this.reqIdActual) return;
        this.productoSeleccionado = prod;
        this.programacionService.getProveedoresDisponiblesTabla(prod.id_prod).subscribe(data => {
            this.proveedoresDisponibles = data;
            this.mostrarPopupProveedores = true;
        });
    }

    onProveedorSeleccionado(pv: PuntoVentaProductoRow) {
        if (!this.reqIdActual || !this.productoSeleccionado) return;
        this.programacionService.seleccionarProveedorParaProducto(this.reqIdActual, this.productoSeleccionado.id_prod, pv.id_puntoVenta);
        // Refrescar tabla y estado de aceptación
        this.cargarProductos(this.reqIdActual);
        this.suscribirPuedeAceptar(this.reqIdActual);
        // Cerrar popup
        this.cerrarPopupProveedores();
    }

    cerrarPopupProveedores() {
        this.mostrarPopupProveedores = false;
        this.productoSeleccionado = null;
        this.proveedoresDisponibles = [];
    }
}