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
  
  updateProductService(id:number, data: any ) {
    console.log('id => ', id, ' data => ', data)
    const url = `${this.BaseUrl}/products/update?id=${id}`
    return  this.httpClient.patch(url, data) ; 
  }
  
  addProductService( data: any ) {
    const url = `${this.BaseUrl}/products/add`
    return  this.httpClient.post(url, data) ; 
  }

  bulkDeleteProductService( data: any ) {
    console.log('data => ', data)
    const url = `${this.BaseUrl}/products/bulkdelete`
    return this.httpClient.delete(url,  {body: {'data': data}} );
  }

  getAllProductService(  ) {
  
    const url = `${this.BaseUrl}/products/getall`
    return this.httpClient.get(url );
  }


  getAllOrdersService(  ) {
  
    const url = `${this.BaseUrl}/orders`
    return this.httpClient.get(url );
  }


}
