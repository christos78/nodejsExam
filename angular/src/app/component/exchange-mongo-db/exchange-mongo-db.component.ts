import { Component, OnInit } from '@angular/core';

import { MongoService } from '../../services/mongo-service/mongo.service';
import { Exchange } from './../../models/exchange';
import { OneExchange } from './../../models/one-exchange';



@Component({
  selector: 'app-exchange-mongo-db',
  templateUrl: './exchange-mongo-db.component.html',
  styleUrls: ['./exchange-mongo-db.component.scss']
})
export class ExchangeMongoDBComponent implements OnInit {


  tab_exchange = [];
  tab_one_exchange = [];

  isShow_Exchange = false;
  isShow_One_Exchange = false;

  exchange_choisi :string;


  constructor(private mongoService: MongoService) {
    this.isShow_Exchange = !this.isShow_Exchange;
   }

  ngOnInit() {
    this.mongoService.getData_ExchangefromMongoDB().subscribe((data: Exchange[]) => {
      this.tab_exchange = Array.from(new Set(data));
    });
  }


  Display(exchange_selected) {
    this.isShow_One_Exchange = !this.isShow_One_Exchange;
    this.getData_fromOneExchange(exchange_selected);
  }

  getData_fromOneExchange(exchange_selected) {
    this.isShow_Exchange = !this.isShow_Exchange;

    this.exchange_choisi = exchange_selected;

    this.mongoService.getData_oneExchangeFromMongoDB(exchange_selected).subscribe((data: OneExchange[]) => {
      this.tab_one_exchange = Array.from(new Set(data));
    });
  }

 

}
