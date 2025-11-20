import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramacionRoutingModule } from './programacion-routing.module';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';

//Components
import {ProductosSolicitadosTableComponent} from './components/productos-solicitados-table/productos-solicitados-table.component';
import {RequerimientosAtendidosTableComponent} from './components/requerimientos-atendidos-table/requerimientos-atendidos-table.component';
import {RequerimientosPendientesTableComponent} from './components/requerimientos-pendientes-table/requerimientos-pendientes-table.component';

//Overlays
import { PopupProveedoresDisponiblesComponent } from './overlays/popup-proveedores-disponibles/popup-proveedores-disponibles.component';
import {PopupDetalleDeRequerimientoComponent} from './overlays/popup-detalle-de-requerimiento/popup-detalle-de-requerimiento.component';


// Pages
import {ListaRequerimientosComponent} from './pages/lista-requerimientos/lista-requerimientos.component';
import { DisponibilidadProductoComponent } from './pages/disponibilidad-producto/disponibilidad-producto.component';

@NgModule({
    declarations: [
        PopupProveedoresDisponiblesComponent,
        ProductosSolicitadosTableComponent,
        RequerimientosAtendidosTableComponent,
        RequerimientosPendientesTableComponent,
        PopupDetalleDeRequerimientoComponent,
        ListaRequerimientosComponent,
        DisponibilidadProductoComponent
    ],
    imports: [
        ProgramacionRoutingModule,
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule
    ]
})


export class ProgramacionModule {}
