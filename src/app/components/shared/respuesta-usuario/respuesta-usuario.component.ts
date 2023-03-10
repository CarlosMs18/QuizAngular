import { Component, OnInit } from '@angular/core';
import { RespuestaQuizzService } from '../../../services/respuesta-quizz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-respuesta-usuario',
  templateUrl: './respuesta-usuario.component.html',
  styleUrls: ['./respuesta-usuario.component.css']
})
export class RespuestaUsuarioComponent implements OnInit{
  id : string;
  loading : boolean = false;
  respuestaCuestionario : any;
  rutaAnterior : string =''
  constructor(
    private _respuestaUsuarioService : RespuestaQuizzService,
    private aRoute : ActivatedRoute,
    private router :Router
  ){

    this.rutaAnterior  = this.aRoute.snapshot.url[0].path
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.obtenerRespuestaUsuario();
  }


  obtenerRespuestaUsuario(){
    this.loading = true
    this._respuestaUsuarioService.getRespuestaUsuario(this.id)
        .subscribe(
          {
            next : resp => {
              if(!resp.exists){
                this.router.navigate(['/'])
                return
              }
              this.respuestaCuestionario = resp.data();
              this.loading = false;
            },
            error : err => {
              console.log(err)
              this.loading = false;
            }

          }
        )
  }

  volver(){
    if(this.rutaAnterior === 'respuestaUsuarioAdmin'){
        this.router.navigate(['/dashboard/estadisticas',this.respuestaCuestionario.idCuestionario])
    }else{
      this.router.navigate(['/'])
    }

  }
}
