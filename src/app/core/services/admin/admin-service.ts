import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  httpClient = inject(HttpClient)
  toast = inject(HotToastService)
  
  BaseUrl = `${environment.apiURL}`;

 

  // products 
  deleteProductService(id:number) {
    // console.log('id => ', id)
    const url = `${this.BaseUrl}/ecommerce/products/delete?id=${id}`
    return  this.httpClient.delete(url) ; 
  }
  
  updateProductService(id:number, data: any ) {
    // console.log('id => ', id, ' data => ', data)
    const url = `${this.BaseUrl}/ecommerce/products/update?id=${id}`
    return  this.httpClient.patch(url, data) ; 
  }
  
  addProductService( data: any ) {
    const url = `${this.BaseUrl}/ecommerce/products/add`
    return  this.httpClient.post(url, data) ; 
  }

  bulkDeleteProductService( data: any ) {
    console.log('data => ', data)
    const url = `${this.BaseUrl}/ecommerce/products/bulkdelete`
    return this.httpClient.delete(url,  {body: {'data': data}} );
  }

  getAllProductService(  ) {
  
    const url = `${this.BaseUrl}/ecommerce/products/getall` 
    return this.httpClient.get(url );
  }

  // orders 
  getAllOrdersService(  ) {
    const url = `${this.BaseUrl}/ecommerce/getOrderAllWithoutFilter`
    return this.httpClient.get(url );
  }


  updateOrdersService(id:number , data:any  ) {
    const url = `${this.BaseUrl}/ecommerce/orders/update?orderId=${id}`
    return this.httpClient.patch(url, data );
  }

  getOrderByOrderNo(id:string  ) {
    const url = `${this.BaseUrl}/ecommerce/orders/orderByNO/${id}`
    return this.httpClient.get(url );
  }


  // users 
    getAllUsersService(  ) {
    const url = `${this.BaseUrl}/auth/userswithoutfilter`
    return this.httpClient.get(url );
  }

   updateUsersByIdService(id:number ,data: any ) {
    const url = `${this.BaseUrl}/auth/users/update?id=${id}`
    return this.httpClient.patch(url,data );
  }
  
   BulkUsersUpdateService( data : any) {
    const url = `${this.BaseUrl}/auth/users/bulkupdate`
    return this.httpClient.patch(url, {ids: data} );
  }
  
  getUserByUserId( userId : any) {
   const url = `${this.BaseUrl}/auth/email/${userId}`
   return this.httpClient.get(url );
  }

  // banners 
  getAllBanner() {
    const url = `${this.BaseUrl}/ecommerce/banners`
    return this.httpClient.get(url );
  }

   editBanner(id:number,data: any ) { 
    const url = `${this.BaseUrl}/ecommerce/banner/${id}`
    return this.httpClient.patch(url,data );
  }
  
   deleteBanner( id:any ,  objId:any) {
    const hash = objId.split('/').pop()
    const url = `${this.BaseUrl}/ecommerce/banner/${id}`
    const params = new HttpParams().set('objId', hash);
    return this.httpClient.delete(url, { params });
  }

  
   private getSignedUrl(){
        const url = `${this.BaseUrl}/ecommerce/s3/Url`
        return this.httpClient.get(url);
      }
  
    uploadFileToS3(file: File): Observable<any> {
      return this.getSignedUrl().pipe(
        switchMap((response: any) => {
          const presignedUrl = response.data; 
          // console.log('presignedUrl =>', presignedUrl)
          this.toast.info("uploading image to s3");

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

  
  
  createBanner(file: File, bannerInfo: any): Observable<any> {
    const url = `${this.BaseUrl}/ecommerce/banner`;
    // 1. Start by uploading the file
    return this.uploadFileToS3(file).pipe(
      switchMap((uploadRes: any) => {
        let uploadedUrl: string = uploadRes.uploadedUrl;
        uploadedUrl= environment.CLOUDFRONT_DOMAIN+uploadedUrl.split('/').pop(); 
        // console.log('uploaded Url => ', uploadedUrl)
        const finalPayload = {
          ...bannerInfo,
          imageUrl: uploadedUrl 
        };

        return this.httpClient.post(url, finalPayload);
      })
    );
  }

  deleteObjFromS3(id:string){
      const url = `${this.BaseUrl}/ecommerce/s3/${id}`
      return this.httpClient.delete(url);
    }

  updateWithNewFileBanner(file: File, bannerInfo: any, id: any, objId:any ): Observable<any> {
    const url = `${this.BaseUrl}/ecommerce/banner/${id}`;

    // 1. Delete old file from s3
    
    return this.deleteObjFromS3(objId).pipe(
      switchMap(() => {
        // 2. Upload new file to S3
        this.toast.info("Uploading ... ")
        return this.uploadFileToS3(file);
      }),
      switchMap((uploadRes: any) => {
        // 3. Build final URL and save to DB
        let uploadedUrl: string = uploadRes.uploadedUrl;
        uploadedUrl = environment.CLOUDFRONT_DOMAIN + uploadedUrl.split('/').pop();

        const finalPayload = {
          ...bannerInfo,
          imageUrl: uploadedUrl
        };
        // console.log("final payload => ", finalPayload)
        return this.httpClient.patch(url, finalPayload);
      })
    );
  }


}
