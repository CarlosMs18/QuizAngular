export class Respuesta{
   description : string;
   esCorrecta : boolean;

  constructor(description : string, esCorrecta : boolean){
    this.description = description;
    this.esCorrecta = esCorrecta;
  }
}
