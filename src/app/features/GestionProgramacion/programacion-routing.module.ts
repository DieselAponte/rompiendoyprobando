import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListaAtendidosComponent } from "./pages/lista-atendidos/lista-atendidos.component";
import { ListaNoAtendidosComponent } from "./pages/lista-no-atendidos/lista-no-atendidos.component";

const routes: Routes = [
  { path: '', component: ListaAtendidosComponent},
  { path: 'no-atendidos', component: ListaNoAtendidosComponent},
  { path: 'atendidos', component: ListaAtendidosComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class ProgramacionRoutingModule {}