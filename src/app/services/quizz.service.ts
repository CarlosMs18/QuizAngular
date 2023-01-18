import { Injectable } from '@angular/core';
import { Subject , Observable} from 'rxjs';
import { Pregunta } from '../models/pregunta.model';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Cuestionario } from '../models/cuestionario.model';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  tituloCuestionario : string = '';
  descripcion : string = '';
  private pregunta$ = new Subject<Pregunta>();

  constructor(private firestore : AngularFirestore) { }

  agregarPregunta(pregunta : Pregunta){
    this.pregunta$.next(pregunta);
  }

  getPreguntas() : Observable<Pregunta>{
    return this.pregunta$.asObservable()
  }

  crearCuestionario(cuestionario : Cuestionario): Promise<any>{
    return this.firestore.collection('cuestionarios').add(cuestionario)//agrega un nuevo document o a la colecion si no existe lo crea
  }
}
