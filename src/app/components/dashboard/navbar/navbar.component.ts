import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {

  constructor(  private afAuth : AngularFireAuth,
              private router :Router
              ){}

  logOut(){
    this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/'])

  }
}
