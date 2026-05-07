import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
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
      const url = `${this.BaseUrl}/ecommerce/cart/items/${data.cartItemId}`
      return this.httpClient.patch(url, data );
    }

    CheckoutCart(userId: number ) {
      const url = `${this.BaseUrl}/ecommerce/cart/checkout`
      return this.httpClient.get(url, { params: { userId: userId } });
    }
     
    GetOrdersByUserId(userId: any, page:number, limit:number){
      const url = `${this.BaseUrl}/ecommerce/orders/getByUser`
      return this.httpClient.get(url, { params: { page:page, limit:limit, id:userId } });
    }
    
    GetAllOrdersByUserId(userId: any, ){
      const url = `${this.BaseUrl}/ecommerce/orders/user/${userId}`
      return this.httpClient.get(url );
    }
    
    GetOrdersByUserIdAndOrderNo(userId: any, orderNo:any ){
      // console.log('orderNo => ', orderNo, userId) 
      const url = `${this.BaseUrl}/ecommerce/order/userId/${orderNo}`
      return this.httpClient.get(url, { params: {  userId:userId } });
    }
    
    // s3 
    private getSignedUrl(){
      const url = `${this.BaseUrl}/ecommerce/s3/Url`
      return this.httpClient.get(url);
    }

    uploadFileToS3(file: File): Observable<any> {
      return this.getSignedUrl().pipe(
        switchMap((response: any) => {
          const presignedUrl = response.data; 
          // console.log('presignedUrl =>', presignedUrl)
          return from(
            fetch(presignedUrl, {
              method: 'PUT',
              headers: { 'Content-Type': file.type },
              body: file,
            }).then(res => {
              if (!res.ok) throw new Error(`S3 upload failed: ${res.status}`);
              
              return { uploadedUrl: presignedUrl.split('?')[0] }; 
            })
          );
        })
      );
    }

    // delete file from s3 
    deleteObjFromS3(id:string){
      const url = `${this.BaseUrl}/ecommerce/s3/${id}`
      return this.httpClient.delete(url);
    }

    

}
