import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizzService } from '../../../services/quizz.service';

@Component({
  selector: 'app-crear-quizz',
  templateUrl: './crear-quizz.component.html',
  styleUrls: ['./crear-quizz.component.css']
})
export class CrearQuizzComponent {
  cuestionarioForm : FormGroup;
  mostrarError : boolean  =false

  constructor(
    private fb : FormBuilder,
    private router :Router,
    private _quizzService :QuizzService
  ){
    this.cuestionarioForm = this.fb.group({
      titulo : ['',Validators.required],
      descripcion : ['',Validators.required]
    })
  }


  siguiente(){
   if(this.cuestionarioForm.invalid){
    //mostrar error por 3 seg
    this.mostrarError = true;
    setTimeout(() => {
      this.mostrarError = false;
    }, 3000);
   }
   else{
    // si el formulario es valido...
    this._quizzService.tituloCuestionario = this.cuestionarioForm.get('titulo')?.value;
    this._quizzService.descripcion = this.cuestionarioForm.get('descripcion')?.value;
    this.router.navigate(['/dashboard/crearPreguntas'])
   }
  }
}
