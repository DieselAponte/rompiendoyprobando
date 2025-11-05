import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasRoutingModule } from './compras-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

//Componentes


//Overlays


//Pages
import { ListaOrdenesComponent } from './pages/lista-ordenes/lista-ordenes.component';
import { ListaProveedoresComponent } from './pages/lista-proveedores/lista-proveedores.component';

@NgModule({
    declarations: [
        ListaOrdenesComponent,
        ListaProveedoresComponent
    ],
    imports: [
        CommonModule,
        ComprasRoutingModule,
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

export class ComprasModule {}