import { Component , OnInit} from '@angular/core';
import { QuizzService } from '../../../services/quizz.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Respuesta } from 'src/app/models/respuesta.model';
import { Pregunta } from '../../../models/pregunta.model';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css']
})
export class CrearPreguntasComponent implements OnInit{
  agregarPregunta : FormGroup;
  mostrarError : boolean = false;
  constructor(
    private _quizzService : QuizzService,
    private fb : FormBuilder,

  ){
      this.agregarPregunta = this.fb.group({
        titulo : ['',Validators.required],
        segundos : [10, Validators.required],
        puntos : [1000, Validators.required],
        respuesta1: this.fb.group({
          titulo : ['',Validators.required],
          esCorrecta : [false,Validators.required]
        }),
        respuesta2: this.fb.group({
          titulo : ['',Validators.required],
          esCorrecta : [false,Validators.required]
        }),
        respuesta3: this.fb.group({
          titulo : '',
          esCorrecta : false
        }),
        respuesta4: this.fb.group({
          titulo : '',
          esCorrecta : false
        }),
      })
  }

  ngOnInit(): void {
    console.log(this._quizzService.descripcion , this._quizzService.tituloCuestionario)

  }

  get seg(){
    return this.agregarPregunta.get('segundos')?.value
  }

  get puntos(){
    return this.agregarPregunta.get('puntos')?.value
  }

  sumarRestarSegundos(numero : number){

    if(this.seg <= 5 && numero < 0){
      return
    }

    this.agregarPregunta.patchValue({
      segundos : this.seg + numero
    })

  }


  esCorrecta(numero : string){

    /* let stringRta = 'respuesta';
    let nroRespuesta = stringRta.concat(numero); */
    this.setFalseRespuestas(numero );

    const estadoRta = this.obtenerEstadoRespuesta(numero);

    this.agregarPregunta.get(`respuesta${numero}`)?.patchValue({
      esCorrecta : !estadoRta
    })
  }


  obtenerEstadoRespuesta(numero : string) :boolean{

    return this.agregarPregunta.get(`respuesta${numero}`)?.get('esCorrecta')?.value;
  }


  setFalseRespuestas(nroRespuestas : string){
      const array = ['respuesta1','respuesta2','respuesta3','respuesta4']
      const nroRespuesta = `respuesta${nroRespuestas}`
      console.log(nroRespuesta)
      //Recorremos el array y seteamos, ponemos todo como false excepto la que el usuario seleciono
      for(let i = 0; i< array.length; i++){
          if(array[i] !== nroRespuesta){
            this.agregarPregunta.get(array[i])?.patchValue({
              esCorrecta : false
            })
          }
      }
  }

  agregarPreg(){


    if(this.agregarPregunta.invalid || this.todasIncorrectas()){
        this.error();
        return;
    }

    let listRespuestas: Respuesta[] = [];

    //Obtenemos respuesta 1
    const rptaTitulo1 = this.agregarPregunta.get('respuesta1')?.get('titulo')?.value;
    const esCorrecta1 = this.agregarPregunta.get('respuesta1')?.get('esCorrecta')?.value;

    const respuesta1:Respuesta = {
      description :rptaTitulo1,
      esCorrecta : esCorrecta1
    }

    listRespuestas.push(respuesta1);


     //Obtenemos respuesta 1
     const rptaTitulo2 = this.agregarPregunta.get('respuesta2')?.get('titulo')?.value;
     const esCorrecta2 = this.agregarPregunta.get('respuesta2')?.get('esCorrecta')?.value;

     const respuesta2:Respuesta = {
       description :rptaTitulo2,
       esCorrecta : esCorrecta2
     }

     listRespuestas.push(respuesta2);




      //Obtenemos respuesta 3
      const rptaTitulo3 = this.agregarPregunta.get('respuesta3')?.get('titulo')?.value;
      const esCorrecta3 = this.agregarPregunta.get('respuesta3')?.get('esCorrecta')?.value;

      const respuesta3:Respuesta = {
        description :rptaTitulo3,
        esCorrecta : esCorrecta3
      }
      if(rptaTitulo3 !== ''){
        listRespuestas.push(respuesta3);
      }



      //Obtenemos respuesta 4
      const rptaTitulo4 = this.agregarPregunta.get('respuesta4')?.get('titulo')?.value;
      const esCorrecta4 = this.agregarPregunta.get('respuesta4')?.get('esCorrecta')?.value;

      const respuesta4:Respuesta = {
        description :rptaTitulo4,
        esCorrecta : esCorrecta4
      }
      if(rptaTitulo3 !== ''){
        listRespuestas.push(respuesta4);
      }
      /* console.log(listRespuestas) */
      //CREAMOS PREGUNTA
      const tituloPregunta = this.agregarPregunta.get('titulo')?.value;
      const segundos = this.agregarPregunta.get('segundos')?.value;
      const puntos = this.agregarPregunta.get('puntos')?.value;

      const pregunta : Pregunta = {
        titulo : tituloPregunta,
        segundos : segundos,
        puntos : puntos,
        listRespuestas : listRespuestas
      }

      /* console.log(pregunta) */
      this._quizzService.agregarPregunta(pregunta);
      this.reset();

  }

  reset(){
    this.agregarPregunta.patchValue({
      titulo : '',
      segundos : 10,
      puntos : 1000,
      respuesta1 : {
        titulo :'',
        esCorrecta :false
      },
      respuesta2 : {
        titulo :'',
        esCorrecta :false
      },
      respuesta3 : {
        titulo :'',
        esCorrecta :false
      },
      respuesta4 : {
        titulo :'',
        esCorrecta :false
      }
    })
  }

  todasIncorrectas(){
    const array = ['respuesta1','respuesta2','respuesta3','respuesta4'];

    for(let i = 0; i< array.length ;i++){
          if(this.agregarPregunta.get(array[i])?.get('esCorrecta')?.value == true){
            return false;
          }
    }

    return true;
  }


  error(){
    this.mostrarError = true;

    setTimeout(() => {
      this.mostrarError = false
    }, 3000);
  }
}
