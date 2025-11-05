import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistribucionRoutingModule } from './distribucion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

// Pages
import { ListaAsignacionComponent } from './pages/lista-asignacion/lista-asignacion.component';
import { ListaEntregasComponent } from './pages/lista-entregas/lista-entregas.component';
import { ListaMonitoreoComponent } from './pages/lista-monitoreo/lista-monitoreo.component';


//Overlays


//Components


@NgModule({
    declarations: [
        ListaAsignacionComponent,
        ListaEntregasComponent,
        ListaMonitoreoComponent
    ],
    imports: [
        DistribucionRoutingModule,

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

export class DistribucionModule {}