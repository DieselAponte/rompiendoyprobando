import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenamientoRoutingModule } from './almacenamiento-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

// Componentes
import { ListaLotesComponent } from './pages/lista-lotes/lista-lotes.component';
import { LotesRecibidosTableComponent } from './components/lotes-recibidos-table/lotes-recibidos-table.component';
import { LotesAtendidosTableComponent } from './components/lotes-atendidos-table/lotes-atendidos-table.component';
import { PopupRegistroIncidenciaComponent } from './pages/popup-registro-incidencia/popup-registro-incidencia.component';
import {PopupReporteLoteComponent} from './pages/popup-reporte-lote/popup-reporte-lote.component';
import {RegistroLoteComponent} from './pages/registro-lote/registro-lote.component';

@NgModule({
  declarations: [
    ListaLotesComponent,
    LotesRecibidosTableComponent,
    LotesAtendidosTableComponent,
    PopupRegistroIncidenciaComponent,
    PopupReporteLoteComponent,
    RegistroLoteComponent
  ],
  imports: [
    CommonModule,
    AlmacenamientoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule
  ]
})
export class AlmacenamientoModule {}
