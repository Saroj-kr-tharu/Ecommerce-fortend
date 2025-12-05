import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { addItemToCart, updateItemCart } from '../../models/cart.model';
import { loadProductType } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CusServices {
      
  httpClient = inject(HttpClient)

  BaseUrl = `${environment.apiURL}`;

  private orderSummary: any;

  setOrderSummary(data: any) {
    this.orderSummary = data;
  }

  getOrderSummary() {
    return this.orderSummary;
  }

  
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

    placeOrder(data: any ) {
      const url = `${this.BaseUrl}/orders/addOrder`
      
      return this.httpClient.post(url, data );
      
    }

    // cart 
    addItemToCart(data: addItemToCart ) {
      const url = `${this.BaseUrl}/cart/add`
      
      return this.httpClient.post(url, data );
      
    }
    getCart(userId:number ) {
      const url = `${this.BaseUrl}/cart/getCart`
      
      return this.httpClient.post(url, userId );
      
    }

    deleteCart(userId:number ) {
      const url = `${this.BaseUrl}/cart/delete`
      
      return this.httpClient.delete(url, { params: { userId: userId } });
      
    }

  removeItemToCart(cartItemId: number ) {
      const url = `${this.BaseUrl}/cart/removeItem`
      
      return this.httpClient.delete(url, { params: { cartItemId: cartItemId } });
      
    }

    updateItemToCart(data: updateItemCart ) {
      const url = `${this.BaseUrl}/cart/updateItem`
      
      return this.httpClient.patch(url, data );
      
    }

    CheckoutCart(userId: number ) {
      const url = `${this.BaseUrl}/cart/updateItem`
      
      return this.httpClient.get(url, { params: { userId: userId } });
      
    }
  
}
