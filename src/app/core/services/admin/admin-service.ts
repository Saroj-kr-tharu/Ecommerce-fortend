import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  httpClient = inject(HttpClient)

  BaseUrl = `${environment.apiURL}`;



  // products 
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

  // orders 
  getAllOrdersService(  ) {
    const url = `${this.BaseUrl}/getOrderAllWithoutFilter`
    return this.httpClient.get(url );
  }


   updateOrdersService(id:number , data:any  ) {
    
    const url = `${this.BaseUrl}/orders/update?orderId=${id}`
    return this.httpClient.patch(url, data );
  }


  // users 

   getAllUsersService(  ) {
  
    const url = `${this.BaseUrl}/userswithoutfilter`
    return this.httpClient.get(url );
  }

   updateUsersByIdService(id:number ,data: any ) {
    const url = `${this.BaseUrl}/users/update?id=${id}`
    return this.httpClient.patch(url,data );
  }
  
   BulkUsersUpdateService( data : any) {
    const url = `${this.BaseUrl}/users/bulkupdate`
    return this.httpClient.patch(url, {ids: data} );
  }
   


}
