import { Component } from '@angular/core';
import {FormGroup, FormBuilder , Validators } from '@angular/forms'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm : FormGroup;
  loading : boolean = false;
  constructor(
    private fb : FormBuilder,
    private afAuth: AngularFireAuth,
    private errorService : ErrorService,
    private toastr: ToastrService,
    private router : Router
    ){
    this.loginForm = this.fb.group({
      usuario : ['',[Validators.required, Validators.email]],
      password : ['',Validators.required]
    })
  }

  login(){
    const usuario = this.loginForm.get('usuario')?.value;
    const password = this.loginForm.get('password')?.value;

    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(usuario,password)
          .then((respuesta) =>{
            console.log(respuesta)

           if(respuesta.user?.emailVerified == false){
              this.router.navigate(['/usuario/verificarCorreo'])
           }else{
            //redierccionar al dashboard email verificado
            this.setLocalStorage(respuesta.user)
            this.router.navigate(['/dashboard'])
           }

            this.loading = false
          })
          .catch((error) => {
            console.log(error)
            this.loading = false
            this.toastr.error(this.errorService.error(error.code), 'Error')
            this.loginForm.reset();
          })

  }

  setLocalStorage(user  :any){
    const usuario : User = {
      uid : user.uid,
      email : user.email
    }
    localStorage.setItem('user',JSON.stringify(usuario))
  }
}
