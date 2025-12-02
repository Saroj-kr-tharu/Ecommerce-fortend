import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HotToastService } from '@ngxpert/hot-toast';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CusServices } from '../../core/services/custumer/cus.services';
import { getAllProductsAction } from './cus.action';

@Injectable()
export class getProductsEffect {

  private actions$ = inject(Actions);
  private cusServices = inject(CusServices);
  private toast = inject(HotToastService);

   login$ = createEffect(() =>
     this.actions$.pipe(
       ofType(getAllProductsAction.load),
       
      
       exhaustMap((action: any) =>

         this.cusServices.getAllProductsService(action.payload).pipe(
             
           this.toast.observe({
             loading: 'Loading...',
             success: 'Sucessfully Loaded',
             error: 'Loading failed!',
           }),
 
           map((res: any) =>
             getAllProductsAction.sucessLoading({payload: res?.data?.rows})
           ),
 
           
           catchError((error) => {
             const errorMessage =
               error?.error?.message ||   
               error?.message ||          
               'Loading failed!'; 
 
             this.toast.error(errorMessage); 
 
             return of(
               getAllProductsAction.failedLoading()
             );
           })
         )
       )
     )
   );


  


  
}
