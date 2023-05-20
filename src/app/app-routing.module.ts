import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoPersonajesComponent } from './listado-personajes/listado-personajes.component';
import { PersonajeComponent } from './personaje/personaje.component';

const routes: Routes = [
  { path: '', component: ListadoPersonajesComponent },
  { path: 'personaje/:id', component: PersonajeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
