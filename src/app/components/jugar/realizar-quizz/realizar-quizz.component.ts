import { Component, OnInit, OnDestroy } from '@angular/core';
import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { Cuestionario } from '../../../models/cuestionario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.css']
})
export class RealizarQuizzComponent implements OnInit, OnDestroy {

  cuestionario !:Cuestionario;
  nombreParticipante : string  ='';
  indexPregunta = 0;
  segundos = 0;
  setInterval : any;
  loading : boolean  = false;

  //Respuesta usuario
  opcionSeleccionada : any;
  indexSeleccionada : any;

  cantidadCorrectas = 0;
  cantidadIncorrectas = 0;
  puntosTotales = 0;
  listRespuestaUsuario : any[] = []

  constructor(
    private _respuestaQuizzService : RespuestaQuizzService,
    private router :Router
  ){}

  ngOnInit(): void {
    this.cuestionario = this._respuestaQuizzService.cuestionario
    this.nombreParticipante = this._respuestaQuizzService.nombreParticipante;
    this.validateRefresh();
    this.iniciarContador();
  }

  ngOnDestroy(): void {
    clearInterval(this.setInterval);
  }
  validateRefresh(){ //si pone refresh al llegar  aeste punto se pondra undefined en el cuestionario puesto que
                  // ante sde llegar a este tenemos que poner el PIN y ahora no, estamos reiniciando en esta misma pag
                  //sin poner e pin
    if(this.cuestionario === undefined){
        this.router.navigate(['/']);
    }
  }

  obtenerSegundos() : number{
    /* return this.cuestionario?.listPreguntas[this.indexPregunta].segundos; */
    return this.segundos;
  }

  obtenterTitulo() : string{
    return this.cuestionario.listPreguntas[this.indexPregunta].titulo
  }

  iniciarContador(){
    this.segundos = this.cuestionario.listPreguntas[this.indexPregunta].segundos;

     this.setInterval =  setInterval(() => {
      if(this.segundos === 0){
     /*    this.indexPregunta++;
        clearInterval(this.setInterval);
        this.iniciarContador() */
        this.agregarRespuesta()
      }

      this.segundos = this.segundos -1;
    },1000)
  }

  respuestaSeleccionada(respuesta : any, index : number){
    this.opcionSeleccionada = respuesta; //su valor es any una vez que le da click toma el valor
    this.indexSeleccionada = index; //para poder luego poder alamacenar al objeto , rastrreary la
                    //resp que el usuario selecciono
  }

   addClassOption(respuesta : any) : string{
    if(respuesta === this.opcionSeleccionada){
      return 'classSeleecionada'
    }else{
      return ''
    }
  }

  siguiente(){
    clearInterval(this.setInterval)// para el bug cuando le sdamos en siguiente y se corre el numero muy deprisa
    this.agregarRespuesta()
    this.iniciarContador()// para el bug cuando le sdamos en siguiente
  }

  agregarRespuesta(){

    //incrementamos contadores(correcto e incorexto)
    this.contadorCorrectaIncorrecta();
    /*  */

    //creeamos objeto respuesta y lo agregamos al array
    const respuestaUsuario : any = {
      titulo : this.cuestionario.listPreguntas[this.indexPregunta].titulo,
      puntosObtenidos : this.obtenemosPuntosPregunta(),
      segundos : this.obtenemosSegundos(),
      indexRespuestaSeleccionada: this.obtenemosIndexSeleccionado(),
      listRespuesta : this.cuestionario.listPreguntas[this.indexPregunta].listRespuestas,
    }

    this.listRespuestaUsuario.push(respuestaUsuario);
    this.opcionSeleccionada = undefined
    this.indexSeleccionada = undefined

    //Validat si es la ltima pregunta
    if(this.cuestionario.listPreguntas.length - 1 === this.indexPregunta){

      //guardamos las respuestas en firebase

      this.guardamosRepuestaCuestionario()

      //redireccionamos al siguiente componente

      /* console.log(this.listRespuestaUsuario) */
     /*  this.router.navigate(['/jugar/respuestaUsuario']) */
    }else{
      this.indexPregunta++;
      this.segundos = this.cuestionario.listPreguntas[this.indexPregunta].segundos;
    }



  }
  obtenemosPuntosPregunta() : number{
    //si el usuario no selecciono ninguna pregunta...
    if(this.opcionSeleccionada === undefined){
        return 0;
    }

    const puntosPregunta = this.cuestionario.listPreguntas[this.indexPregunta].puntos;

    //validamos si la pregunta es correcta
    if(this.opcionSeleccionada.esCorrecta == true){
      //incrementamos la variable puntos totales...
      this.puntosTotales = this.puntosTotales + puntosPregunta;
      return puntosPregunta
    }else{
      return 0;
    }
  }


  obtenemosSegundos():string{
    //validamos si el usuario respondio o no la pregunta
    if(this.opcionSeleccionada === undefined){
      return 'NO RESPONDIO'
    }else{
      const segundosPregunta = this.cuestionario.listPreguntas[this.indexPregunta].segundos;
      const segundosRespondidos = segundosPregunta - this.segundos;

      return segundosRespondidos.toString();
    }
  }

  obtenemosIndexSeleccionado() : any{
      if(this.opcionSeleccionada === undefined){
        return '';
      }else{
        return this.indexSeleccionada
      }
  }

  contadorCorrectaIncorrecta(){
    //validamos si el usuario selecciono  una pregunta
    if(this.opcionSeleccionada === undefined) {
      this.cantidadIncorrectas++;
      return;
    }

    //Preguntamos si la opcion es incorrecta
    if(this.opcionSeleccionada.esCorrecta === false){
      this.cantidadIncorrectas++;
    }else{
      this.cantidadCorrectas++;
    }

  }

  guardamosRepuestaCuestionario(){
    const respuestaCuestionario : any = {
      idCuestionario: this.cuestionario.id,
      nombreParticipante : this.nombreParticipante,
      fecha : new Date(),
      cantidadPreguntas : this.cuestionario.cantPreguntas,
      cantidadCorrectas :this.cantidadCorrectas,
      cantidadIncorrectas : this.cantidadIncorrectas,
      puntosTotales: this.puntosTotales,
      listRespuestaUsuario : this.listRespuestaUsuario
    }

    this.loading =true;
    /* console.log(respuestaCuestionario) */

    //ALMACENAMOS LA RPTA EN FIREBASE
    this._respuestaQuizzService.setRespuestaUsuario(respuestaCuestionario).then( data =>{
      console.log(data)
      //redireccionamos al siguiente component
      this.router.navigate(['/jugar/respuestaUsuario', data.id])
    }, error => {
      console.log(error)
      this.router.navigate(['/'])
    })
  }
}
