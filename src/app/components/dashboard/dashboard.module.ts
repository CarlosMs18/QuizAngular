import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListCuestionariosComponent } from './list-cuestionarios/list-cuestionarios.component';
import { CrearQuizzComponent } from './crear-quizz/crear-quizz.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearPreguntasComponent } from './crear-preguntas/crear-preguntas.component';
import { ListPreguntasComponent } from './list-preguntas/list-preguntas.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListCuestionariosComponent,
    CrearQuizzComponent,
    CrearPreguntasComponent,
    ListPreguntasComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
