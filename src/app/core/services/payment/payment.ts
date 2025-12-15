import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Payment {
  httpClient = inject(HttpClient)

  BaseUrl = `${environment.apiURL}`;



  // products 
  paymentIntialize(data:any) {
    const url = `${this.BaseUrl}/orders/orderIntial`
    return  this.httpClient.post(url, data) ; 
  }




}
