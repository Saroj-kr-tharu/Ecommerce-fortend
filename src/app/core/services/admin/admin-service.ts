import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
    httpClient = inject(HttpClient)

  BaseUrl = `${environment.apiURL}`;

  deleteProductService(id:number) {
    console.log('id => ', id)
    const url = `${this.BaseUrl}/products/delete?id=${id}`
    return  this.httpClient.delete(url) ; 
  }

 
}
