import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit , OnDestroy{
  id !:string;
  loading = false;
  listRespuestasUsuario : any[] = []
  respuestasQuizz : Subscription = new Subscription()

  constructor(
      private aRoute : ActivatedRoute,
      private _respuestaUsuarioService : RespuestaQuizzService,
      private toastr :ToastrService
  ){

    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }


  ngOnInit(): void {
    this.getRespuestaByIdCuestionario()
  }

  ngOnDestroy(): void {
    this.respuestasQuizz.unsubscribe()
  }
  getRespuestaByIdCuestionario(){
    this.loading =true;
   this.respuestasQuizz =   this._respuestaUsuarioService.getRespuestaByIdCuestionario(this.id).subscribe(data =>{
      this.loading = false

      this.listRespuestasUsuario = []; //para que no haya duplicidad de datos
      data.forEach((element : any) => {
        this.listRespuestasUsuario.push({
          id : element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
      console.log(this.listRespuestasUsuario)
    },error => {
      console.log(error)
      this.loading = false
    })
  }

  eliminarRespuestaUsuario(id : string){
    this.loading = true;
    this._respuestaUsuarioService.deleteRespuestaUsuario(id).then(() =>{
      this.loading = false;
      this.toastr.info('La respuesta fue eliminada','Respuesta Eliminada');
      //recordar firebase agrega doc en tiempo real una de las ventahas de firebase
      //ES DECIR HACEL TODAS LAS PETICIONES EN TIEMPO REAL INFLUYENDO ASI EN TODAS LAS VENTANAS SI NECSIA DE RECARGAR
    },error => {
      console.log(error);
      this.toastr.error('Oops ocurrio un error inesperado','Error')
    })
  }
}
