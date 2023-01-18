import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule} from '@angular/fire/compat'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './components/inicio/inicio.component';
import { SharedModule } from './components/shared/shared.module';
import { environment } from '../environments/environments.prod';
import { DashboardModule } from './components/dashboard/dashboard.module';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    DashboardModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
