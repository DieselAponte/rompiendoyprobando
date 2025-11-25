import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramacionService, DetalleRequerimientoDecision } from '../../services/programacion.service';
import { DetalleRequerimientoAtenderTableComponent } from '../../components/detalle-requerimiento-atender/detalle-requerimiento-atender-table.component';
import { PopupRevisarStockProductoComponent } from '../../overlays/popup-revisar-stock-producto/popup-revisar-stock-producto.component';
import { CommonModule } from '@angular/common';
import { InventarioStockDto } from '../../models/InventarioStockDto';
import { RequerimientoResumenDto } from '../../models/RequerimientoResumenDto';

@Component({
    selector: 'app-disponibilidad-producto',
    templateUrl: './disponibilidad-producto.component.html',
    standalone: true,
    imports: [CommonModule, DetalleRequerimientoAtenderTableComponent, PopupRevisarStockProductoComponent],
    styleUrls: ['./disponibilidad-producto.component.css']
})

export class DisponibilidadProductoComponent implements OnInit {
    reqIdActual: number | null = null;
    productos: DetalleRequerimientoDecision[] = [];
    observaciones = '';
    mostrarPopupStock = false;
    lotesProducto: InventarioStockDto[] = [];
    nombreProductoSeleccionado = '';

    constructor(private programacionService: ProgramacionService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const idFromRoute = this.route.snapshot.paramMap.get('id');
        if (idFromRoute) {
            this.reqIdActual = Number(idFromRoute);
            this.programacionService.loadProductosParaAtender(this.reqIdActual);
        } else {
            this.programacionService.getRequerimientosPendientesTabla().subscribe((pendientes: RequerimientoResumenDto[]) => {
                if (pendientes.length) {
                    this.reqIdActual = pendientes[0].id;
                    this.programacionService.loadProductosParaAtender(this.reqIdActual);
                }
            });
        }
        this.programacionService.getProductosParaAtender().subscribe(lista => {
            this.productos = lista;
        });
    }

    onAtender(payload: { productos: DetalleRequerimientoDecision[]; observaciones: string }) {
        if (this.reqIdActual) {
            this.programacionService.aceptarRequerimiento(this.reqIdActual);
        }
        history.back();
    }

    onVolver() { history.back(); }

    onRevisarStock(producto: DetalleRequerimientoDecision) {
        this.nombreProductoSeleccionado = producto.idProducto?.nombreProducto || '';
        const productoId = producto.idProducto?.id;
        if (!productoId) {
            return;
        }
        this.programacionService.getLotesByProducto(productoId).subscribe(l => {
            this.lotesProducto = l;
            this.mostrarPopupStock = true;
        });
    }

    cerrarPopupStock() {
        this.mostrarPopupStock = false;
        this.lotesProducto = [];
        this.nombreProductoSeleccionado = '';
    }
}