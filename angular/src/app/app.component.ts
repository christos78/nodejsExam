import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';


  isShow_exchange = false;

  isShow_exchange_bdd = false;


  listEschange: string;


 
  Display1(exchanges) {
    this.listEschange = exchanges;
    this.isShow_exchange = !this.isShow_exchange;
  }

  Display2() {
    this.isShow_exchange_bdd = !this.isShow_exchange_bdd;
  }

 


}


