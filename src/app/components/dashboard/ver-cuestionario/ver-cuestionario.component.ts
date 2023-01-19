import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzService } from '../../../services/quizz.service';
import { Cuestionario } from '../../../models/cuestionario.model';

@Component({
  selector: 'app-ver-cuestionario',
  templateUrl: './ver-cuestionario.component.html',
  styleUrls: ['./ver-cuestionario.component.css']
})
export class VerCuestionarioComponent implements OnInit{
  id : string = '';
  loading : boolean = false;
  cuestionario!: Cuestionario;

  constructor(
    private _quizzService :QuizzService,
    private aRoute :ActivatedRoute
  ){
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.obtenerQuizz();
  }


  obtenerQuizz(){
    this.loading = true;
    this._quizzService.getCuestionario(this.id)
            .subscribe({
              next :  doc => {
                console.log(doc.data())
                this.loading = false;
                this.cuestionario = doc.data();
              },
              error : err => {
                this.loading = false;
              }
            })
  }
}
