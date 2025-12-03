import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { loadProductType } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CusServices {
      
  httpClient = inject(HttpClient)

  BaseUrl = `${environment.apiURL}`;

  
    getAllProductsService(data: loadProductType) {
      const url = `${this.BaseUrl}/products`
      
    
      const params = { ...data } as Record<string, string | number | boolean>;
      return this.httpClient.get(url, { params });
      
    }
    
    getProductByIdService(data: number) {
      const url = `${this.BaseUrl}/product?id=${data}`
      
    
      const params = { id: data } as Record<string,  | number >;
      return this.httpClient.get(url);
      
    }
  
}
