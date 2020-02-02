import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ExchangeComponent } from './component/exchange/exchange.component';
import { HttpClientModule } from '@angular/common/http';
import { ExchangeMongoDBComponent } from './component/exchange-mongo-db/exchange-mongo-db.component';
// import { MongoService } from './services/mongo-service/mongo.service';


@NgModule({
  declarations: [
    AppComponent,
    ExchangeComponent,
    ExchangeMongoDBComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
