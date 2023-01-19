import { Component, OnInit } from '@angular/core';
import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent implements OnInit{

  public nombre : string = ''
  errorText : string = '';
  error : boolean = false;

  constructor(
    private _respuestaQuizzService :RespuestaQuizzService,
    private router :Router
  ){}
  ngOnInit(): void {
    this.validarRefresh();
  }

  ingresarNombre(){
    if(this.nombre === ''){
      this.errorMensaje('Ingrese su nombre')
      return
    }
    this._respuestaQuizzService.nombreParticipante = this.nombre;
    this.router.navigate(['/jugar/iniciarContador'])
  }

  errorMensaje(texto : string){
    this.errorText = texto;
    this.error = true;



    //mostramos el error por 4 seg

    setTimeout(() => {
        this.error = false;
    }, 4000);
  }


  validarRefresh(){ //para que cuando este adentro y le de f5 o actualizar se pierde
                //el dato porque hace por dentras una peticion asi que tenemos que regresar a la pagina de inicio

    if(this._respuestaQuizzService.cuestionario === undefined){
       this.router.navigate(['/'])
    }
  }
}
