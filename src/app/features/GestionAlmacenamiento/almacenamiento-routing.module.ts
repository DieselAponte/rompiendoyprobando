import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLotesComponent } from './pages/lista-lotes/lista-lotes.component';
import { RegistroLoteComponent } from './pages/registro-lote/registro-lote.component';

const routes: Routes = [
  { path: '', component: ListaLotesComponent },
  { path: 'registro/:id', component: RegistroLoteComponent } // <-- Nueva ruta
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenamientoRoutingModule {}
