import { Component, OnInit, OnDestroy } from '@angular/core';
import { RespuestaQuizzService } from '../../services/respuesta-quizz.service';
import { Cuestionario } from '../../models/cuestionario.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnDestroy{
  error : boolean = false;
  pin : string = '';
  errorText : string ='';
  loading : boolean = false;
  suscriptionCode$ :Subscription = new Subscription();

  constructor(
    private respuestaQuizz : RespuestaQuizzService,
    private router  :Router
  ){}


  ngOnDestroy(): void {
    this.suscriptionCode$.unsubscribe();
  }


  ingresar(){
    if(this.pin === ''){
      this.error = true;

      this.errorMensaje('Por favor ingrese PIN');

      return
    }
    this.loading  = true;
    this.suscriptionCode$ =  this.respuestaQuizz.searchByCode(this.pin).subscribe(data =>{
      this.loading = false;
      if(data.empty){
        this.errorMensaje('PIN Invalido')
      }else{
        data.forEach((element : any)=> {
          const cuestionario :Cuestionario ={
            id : element.id,
            ...element.data()
          }
          console.log(cuestionario)
          this.respuestaQuizz.cuestionario = cuestionario;
          //REDIRECCIONAR AL PROX COMPONENTE;
          this.router.navigate(['/jugar'])
        });


      }
    },error =>{
      console.log(error);
      this.loading = false;
    })
  }

  errorMensaje(texto : string){
    this.errorText = texto;
    this.error = true;
    this.pin = ''


    //mostramos el error por 4 seg

    setTimeout(() => {
        this.error = false;
    }, 4000);
  }
}
