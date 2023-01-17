import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-quizz',
  templateUrl: './crear-quizz.component.html',
  styleUrls: ['./crear-quizz.component.css']
})
export class CrearQuizzComponent {
  cuestionarioForm : FormGroup;
  mostrarError : boolean  =false

  constructor(private fb : FormBuilder){
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
  }
}
