import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path : '', component : InicioComponent},
  {path : 'usuario', loadChildren : () => import('./components/usuario/usuario.module')
                                .then( m => m.UsuarioModule)},

  {path : 'jugar', loadChildren : () => import('./components/jugar/jugar.module')
                                .then( m => m.JugarModule)},
  {path : 'dashboard', component : DashboardComponent,  loadChildren : () => import('./components/dashboard/dashboard.module')
                                .then( m => m.DashboardModule), canActivate: [AuthGuard]},
  {path : '**', redirectTo : '' , pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
