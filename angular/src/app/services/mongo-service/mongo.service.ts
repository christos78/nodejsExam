import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MongoService {

  baseURL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getData(list_exchange) {
    return this.http.get(`${this.baseURL}/exchange/list`,{
      params: {
        list_exchange: list_exchange
      }
    });
  };

  saveData(body) {
    return this.http.post(`${this.baseURL}/exchange/`, body);
  };


  getData_oneExchange(exchange) {
    return this.http.get(`${this.baseURL}/exchange/one-exchange`, {
      params: {
        exchange: exchange
      }
    });
  };

  saveData_CryptoDB(body) {
    return this.http.post(`${this.baseURL}/exchange/one-exchange/crypto/`, body);
  };

  getData_ExchangefromMongoDB() {
    return this.http.get(`${this.baseURL}/exchange/list/mongoDB`);
  };
  
  getData_oneExchangeFromMongoDB(exchange) {
    return this.http.get(`${this.baseURL}/exchange/one-exchange/crypto/mongoDB`, {
      params: {
        exchange: exchange
      }
    });
  };

}
