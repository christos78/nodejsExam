import { Component, OnInit } from '@angular/core';

import { MongoService } from '../../services/mongo-service/mongo.service';
import { Exchange } from './../../models/exchange';
import { AppComponent } from '../../app.component'
import { OneExchange } from './../../models/one-exchange';


@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit {


  listExchange: string;

  tab_exchange = [];
  tab_one_exchange = [];

  status_save_exchange: number;
  status_save_crypto: number;



  isShow_One_Exchange = false;


  constructor(private mongoService: MongoService, private appComponent: AppComponent) {
    this.status_save_exchange = 0;
    this.status_save_crypto = 0;
    console.log(this.appComponent.listEschange);

  }

  ngOnInit() {

    this.mongoService.getData(this.appComponent.listEschange).subscribe((data: Exchange[]) => {
      this.tab_exchange = Array.from(new Set(data));
      console.log(data);
    });

  }


  saveData() {
    
    for (let i = 0; i < this.tab_exchange.length; i++) {

      console.log(this.status_save_exchange);

      this.mongoService.saveData(this.tab_exchange[i]).subscribe(() => {
        this.status_save_exchange = 1;
      });

    }
  }

  Display(exchange_selected) {
    this.isShow_One_Exchange = !this.isShow_One_Exchange;
    console.log(this.isShow_One_Exchange);
    this.getData_fromOneExchange(exchange_selected);
  }

  getData_fromOneExchange(exchange_selected) {
    console.log("exchange_selected : ", exchange_selected);

    this.mongoService.getData_oneExchange(exchange_selected).subscribe((data: OneExchange[]) => {
      this.tab_one_exchange = Array.from(new Set(data));
    });
  }
 

  saveData_Crypto() {
    for (let i = 0; i < this.tab_one_exchange.length; i++) {

      this.mongoService.saveData_CryptoDB(this.tab_one_exchange[i]).subscribe(() => {
        this.status_save_crypto = 1;
      });

    }
  }



}
