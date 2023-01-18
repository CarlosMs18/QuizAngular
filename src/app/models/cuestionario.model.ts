import { Pregunta } from "./pregunta.model";

export class Cuestionario{
  id?: number;
  uid : string;
  titulo : string;
  descripcion : string;
  codigo :string;
  cantPreguntas : number;
  fechaCreacion : Date;
  listPreguntas: Pregunta[]

  constructor(uid : string, titulo : string, descripcion : string, codigo : string, cantPreguntas : number,
                fechaCreacion: Date,listPreguntas : Pregunta[]){
                  this.uid = uid;
                  this.titulo = titulo;
                  this.descripcion = descripcion;
                  this.codigo = codigo;
                  this.cantPreguntas = cantPreguntas;
                  this.fechaCreacion = fechaCreacion;
                  this.listPreguntas = listPreguntas;
                }
}
