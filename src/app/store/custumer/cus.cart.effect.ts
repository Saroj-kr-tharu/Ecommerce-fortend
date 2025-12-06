import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HotToastService } from '@ngxpert/hot-toast';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CusServices } from '../../core/services/custumer/cus.services';
import { addItemcartsAction, bulkUpdateItemAction, clearCartAction, deleteBulkItemAction, getcartsAction, removeItemAction, updateItemAction } from './cus.action';

@Injectable()
export class cartAddItemsEffect {

  private actions$ = inject(Actions);
  private cusServices = inject(CusServices);
  private toast = inject(HotToastService);
  private router = inject(Router)

   login$ = createEffect(() =>
     this.actions$.pipe(
       ofType(addItemcartsAction.addItem),
       
      
       exhaustMap((action: any) =>

         this.cusServices.addItemToCart(action.payload).pipe(
             
           this.toast.observe({
             loading: 'Adding...',
             success: 'Sucessfully Added',
             error: 'Adding failed!',
           }),
 
           map((res: any) =>{
            // this.router.navigate(['/cart'])
             return addItemcartsAction.sucessAdded({payload: res})
            }
           ),
 
           
           catchError((err) => {
             const errorMessage =      
               'Loading failed!'; 

               
 
             this.toast.error(errorMessage); 
 
             return of(
               addItemcartsAction.failedToAdded()
             );
           })
         )
       )
     )
   );


  


  
}




export class getItemsCartEffect {

  private actions$ = inject(Actions);
  private cusServices = inject(CusServices);
  private toast = inject(HotToastService);

   getCart$ = createEffect(() =>
     this.actions$.pipe(
       ofType(getcartsAction.getCart),
       
      
       exhaustMap((action: any) =>

         this.cusServices.getCart(action.payload).pipe(
             
           this.toast.observe({
             loading: 'Getting Cart...',
             success: 'Sucessfully Get Cart',
             error: 'Failed to get cart!',
           }),
 
           map((res: any) =>
             getcartsAction.sucessGetCart({payload: res})
           ),
 
           
           catchError((err) => {
             const errorMessage =      
               'Loading failed!'; 
             
             this.toast.error(errorMessage); 
 
             return of(
               getcartsAction.failedToGetCart()
             );
           })
         )
       )
     )
   );


  


  
}




export class clearCartEffect {

  private actions$ = inject(Actions);
  private cusServices = inject(CusServices);
  private toast = inject(HotToastService);

   clearCart$ = createEffect(() =>
     this.actions$.pipe(
       ofType(clearCartAction.clearCart),
       
      
       exhaustMap((action: any) =>

         this.cusServices.deleteCart(action.payload).pipe(
             
           this.toast.observe({
             loading: 'Deleting Cart...',
             success: 'Sucessfully Deleted',
             error: 'Failed to Delete!',
           }),
 
           map((res: any) =>
             clearCartAction.sucessClearCart({payload: res})
           ),
 
           
           catchError((err) => {
             const errorMessage =      
               'Loading failed!'; 
             
             this.toast.error(errorMessage); 
 
             return of(
               clearCartAction.failedToClearCart()
             );
           })
         )
       )
     )
   );


  


  
}




export class removeItemEffect {

  private actions$ = inject(Actions);
  private cusServices = inject(CusServices);
  private toast = inject(HotToastService);

   removeItem$ = createEffect(() =>
     this.actions$.pipe(
       ofType(removeItemAction.removeItem),
       
      
       exhaustMap((action: any) =>

         this.cusServices.removeItemToCart(action.payload).pipe(
             
           this.toast.observe({
             loading: 'Removing From  Cart...',
             success: 'Sucessfully Remove',
             error: 'Failed to Remove!',
           }),
 
           map((res: any) =>
             removeItemAction.sucessRemoveItem({payload: res})
           ),
 
           
           catchError((err) => {
             const errorMessage =      
               'Loading failed!'; 
             
             this.toast.error(errorMessage); 
 
             return of(
               removeItemAction.failedToRemoveItem()
             );
           })
         )
       )
     )
   );


  


  
}


export class updateItemEffect {

  private actions$ = inject(Actions);
  private cusServices = inject(CusServices);
  private toast = inject(HotToastService);

   updateItem$ = createEffect(() =>
     this.actions$.pipe(
       ofType(updateItemAction.updateItem),
       
      
       exhaustMap((action: any) =>

         this.cusServices.updateItemToCart(action.payload).pipe(
             
           this.toast.observe({
             loading: 'Updating    Cart...',
             success: 'Sucessfully Updated Cart',
             error: 'Failed to Update cart!',
           }),
 
           map((res: any) =>
             updateItemAction.sucessUpdateItem({payload: res})
           ),
 
           
           catchError((err) => {
             const errorMessage =      
               'Loading failed!'; 
             
             this.toast.error(errorMessage); 
 
             return of(
               updateItemAction.failedToUpdateItem()
             );
           })
         )
       )
     )
   );


  


  
}




export class BulkDelItemEffect {

  private actions$ = inject(Actions);
  private cusServices = inject(CusServices);
  private toast = inject(HotToastService);

   updateItem$ = createEffect(() =>
     this.actions$.pipe(
       ofType(deleteBulkItemAction.deleteBulkItem),
       
      
       exhaustMap((action: any) =>

         this.cusServices.BulkremoveItemToCart(action.payload).pipe(
             
           this.toast.observe({
             loading: 'Bulk Deleteing    Cart...',
             success: 'Sucessfully Bulk  Deleted Cart',
             error: 'Failed to Bulk Delete cart!',
           }),
 
           map((res: any) =>
             deleteBulkItemAction.sucessBulkDelItem({payload: res})
           ),
 
           
           catchError((err) => {
             const errorMessage =      
               'Loading failed!'; 
             
             this.toast.error(errorMessage); 
 
             return of(
               deleteBulkItemAction.failedBulkDelete()
             );
           })
         )
       )
     )
   );


  


  
}




export class bulkUpdateItemEffect {

  private actions$ = inject(Actions);
  private cusServices = inject(CusServices);
  private toast = inject(HotToastService);
  private router = inject(Router)

  updateItem$ = createEffect(() =>
    this.actions$.pipe(
     ofType(bulkUpdateItemAction.bulkUpdateItem),
     exhaustMap((action: any) =>
      this.cusServices.BulkupdateItemToCart(action.payload).pipe(
        this.toast.observe({
         loading: 'Bulk updating Cart...',
         success: 'Successfully Bulk updated Cart',
         error: 'Failed to Bulk update cart!',
        }),
        map((res: any) => {
         this.router.navigate(['/checkout']);
         return bulkUpdateItemAction.sucessBulkUpdateItem({ payload: res });
        }),
        catchError((err) => {
         const errorMessage = 'Loading failed!';
         this.toast.error(errorMessage);
         return of(
          bulkUpdateItemAction.failedBulkUpdateItem()
         );
        })
      )
     )
    )
  );


  


  
}