import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLotesComponent } from './pages/lista-lotes/lista-lotes.component';
import { RegistroLoteComponent } from './pages/registro-lote/registro-lote.component';
import { ListaInventarioComponent } from './pages/lista-inventario/lista-inventario.component';

const routes: Routes = [
  { path: '', component: ListaLotesComponent },
  { path: 'lotes', component: ListaLotesComponent },
  { path: 'inventario', component:ListaInventarioComponent},
  { path: 'registro/:id', component: RegistroLoteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenamientoRoutingModule {}
