import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListaMonitoreoComponent } from "./pages/lista-monitoreo/lista-monitoreo.component";
import { ListaEntregasComponent } from "./pages/lista-entregas/lista-entregas.component";

const routes: Routes = [
  { path: '', component: ListaAsignacionComponent},
  { path: 'asignacion', component: ListaAsignacionComponent},
  { path: 'monitoreo', component: ListaMonitoreoComponent},
  { path: 'entregas', component: ListaEntregasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 
export class DistribucionRoutingModule {}