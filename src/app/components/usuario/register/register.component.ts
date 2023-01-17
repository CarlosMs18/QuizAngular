import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm : FormGroup;
  loading : boolean = false

  constructor(
    private fb : FormBuilder,
    private afAuth: AngularFireAuth,
    private router :Router,
    private toastr: ToastrService,
    private errorService : ErrorService
  ){
    this.registerForm = this.fb.group({
      usuario : ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      repetirPassword : ['']

    } ,{ validator : this.checkPassword})
  }
  register(){
    const usuario = this.registerForm.get('usuario')?.value;
    const password = this.registerForm.get('password')?.value;

    this.loading = true;
    console.log(usuario , password)
    this.afAuth.createUserWithEmailAndPassword(usuario,password)
            .then(rta => {
              rta.user?.sendEmailVerification();
              this.toastr.success('Enviamos un correo electronico para verficar su cuenta', 'Usuario Registrado');
             this.router.navigate(['/usuario'])
            })
            .catch(error=> {
              this.registerForm.reset();
              this.loading = false;
              this.toastr.error(  this.errorService.error(error.code),'Ops ocurrio un error')
              /* this.error(error.code) */
            })
  }

  /* error(code : string) : string{
    switch(code){

      //EMAIL  YA REGISTRADO
      case 'auth/email-already-in-use':
        return 'El correo ya esta registrado'

      //Correo invalido
      case 'auth/invalid-email':
        return 'El correo es invalido'


      //la contraseña es muy debil
      case 'auth/weak-password':
        return 'La contraseña es muy debil'

      default:
        return 'Error desconocido'
    }
  } */

  checkPassword(group: FormGroup) {
    const pass = group.controls['password']?.value;
    const reppass = group.controls['repetirPassword']?.value;


    return pass === reppass ? null : {notSame: true};
  }
}
