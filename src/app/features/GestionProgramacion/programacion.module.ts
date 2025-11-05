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
import { MatTooltipModule } from '@angular/material/tooltip';

// Pages
import { ListaAtendidosComponent } from './pages/lista-atendidos/lista-atendidos.component';
import { ListaNoAtendidosComponent } from './pages/lista-no-atendidos/lista-no-atendidos.component';


//Overlays


//Components


@NgModule({
    declarations: [
        ListaAtendidosComponent,
        ListaNoAtendidosComponent
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
