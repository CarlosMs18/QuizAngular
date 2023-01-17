import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
    recuperarForm : FormGroup;
    loading : boolean = false
    constructor(
                private fb : FormBuilder,
                private afAuth: AngularFireAuth,
                private router :Router,
                private toastr: ToastrService,
                private errorService : ErrorService){
        this.recuperarForm = this.fb.group({
        usuario : ['',[Validators.required, Validators.email]]
       })
    }


    recuperarPassword(){
      //obtener el correo
      const correo = this.recuperarForm.get('usuario')?.value;
      this.loading  = true;
      this.afAuth.sendPasswordResetEmail(correo)
                .then(()=> {
                  this.toastr.info('Enviamos un correo electronico para reestablecer su password', 'Reestablecer password');
                  this.router.navigate(['/usuario']);
                })
                .catch(error => {
                  this.loading= false
                  this.toastr.error(this.errorService.error(error.code), 'Error');
                  this.recuperarForm.reset()
                })
    }
}
