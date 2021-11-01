import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearActaComponent } from './components/acta/crear-acta/crear-acta.component';


const routes: Routes = [

  {path: '', component: CrearActaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 



}
