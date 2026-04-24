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
    localStorage.setItem('orderSummary', JSON.stringify(data))
    this.orderSummary = data;
  }

  getOrderSummary() {
      const savedSummary = localStorage.getItem('orderSummary');
      if (savedSummary) {
        this.orderSummary = (JSON.parse(savedSummary));
      } 
    return this.orderSummary;
  }

  
    getAllProductsService(data: loadProductType) {
      const url = `${this.BaseUrl}/ecommerce/products`
      const params = { ...data } as Record<string, string | number | boolean>;
      return this.httpClient.get(url, { params });
    }
    
    // products 
    getProductByIdService(data: number) {
      const url = `${this.BaseUrl}/ecommerce/product?id=${data}`
      const params = { id: data } as Record<string,  | number >;
      return this.httpClient.get(url);
    }

    placeOrder(data: any ) {
      const url = `${this.BaseUrl}/ecommerce/orders/addOrder`
      return this.httpClient.post(url, data );
    }

    // cart 
    addItemToCart(data: addItemToCart ) {
      const url = `${this.BaseUrl}/ecommerce/cart/items`
      return this.httpClient.post(url, data );
    }
    getCart(userId:number ) {
      const url = `${this.BaseUrl}/ecommerce/cart`
      // console.log("data => ", userId)
      return this.httpClient.post(url, userId );
    }

    deleteCart(userId:number ) {
      const url = `${this.BaseUrl}/ecommerce/cart/items`     
      return this.httpClient.delete(url, { params: { userId } });
    }

  removeItemToCart(cartItemId: number ) {
      const url = `${this.BaseUrl}/ecommerce/cart/items/${cartItemId}`
      return this.httpClient.delete(url);
    }

  BulkremoveItemToCart(cartItemIds: number[] ) {
      const url = `${this.BaseUrl}/ecommerce/cart/items`
      return this.httpClient.delete(url, {
        body: { cartItemIds }
      });
  }

  BulkupdateItemToCart(cartItemIds: any ) {
      const url = `${this.BaseUrl}/ecommerce/cart/items`
      return this.httpClient.patch(url, cartItemIds);
  }

    updateItemToCart(data: updateItemCart ) {
      // console.log("data from delete update => ", data )
      const url = `${this.BaseUrl}/ecommerce/cart/items/${data.cartItemId}`
      return this.httpClient.patch(url, data );
    }

    CheckoutCart(userId: number ) {
      const url = `${this.BaseUrl}/ecommerce/cart/checkout`
      return this.httpClient.get(url, { params: { userId: userId } });
    }
  
}
