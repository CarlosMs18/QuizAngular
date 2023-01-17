import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  error : boolean = false;
  pin : string = '';

  ingresar(){
    if(this.pin === ''){
      this.error = true;

      setTimeout(() => {
        this.error = false;
      }, 3000);

      return
    }
  }
}
