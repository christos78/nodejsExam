import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExchangeComponent } from './component/exchange/exchange.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home', 
    component: ExchangeComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
