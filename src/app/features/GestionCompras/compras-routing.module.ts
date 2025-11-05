import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaOrdenesComponent } from './pages/lista-ordenes/lista-ordenes.component';
import { ListaProveedoresComponent } from './pages/lista-proveedores/lista-proveedores.component';

const routes: Routes = [
  { path: '', component: ListaOrdenesComponent },
  { path: 'ordenes', component: ListaOrdenesComponent },
  { path: 'proveedores', component:ListaProveedoresComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule {}
