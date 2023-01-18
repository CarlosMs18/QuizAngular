import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { CrearQuizzComponent } from './crear-quizz/crear-quizz.component';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';

const routes: Routes = [
  {path : '',component : ListCuestionariosComponent},
  {path : 'crearQuizz',component : CrearQuizzComponent},
  {path : 'crearPreguntas',component : CrearPreguntasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
