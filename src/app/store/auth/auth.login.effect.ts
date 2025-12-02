import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HotToastService } from '@ngxpert/hot-toast';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthServices } from '../../core/services/auth/auth-services';
import { loginAction } from './auth.actions';

@Injectable()
export class AuthLoginEffect {

  private actions$ = inject(Actions);
  private authServices = inject(AuthServices);
  private toast = inject(HotToastService);

  //  login$ = createEffect(() =>
  //    this.actions$.pipe(
  //      ofType(loginAction.login),
       
      
  //      exhaustMap((action: any) =>

  //        this.authServices.loginService(action.payload).pipe(
             
  //          this.toast.observe({
  //            loading: 'Loging...',
  //            success: 'Sucessfully login',
  //            error: 'Login failed!',
  //          }),
 
  //          map((res: any) =>
  //            loginAction.sucessLogin({payload: res?.data})
  //          ),
 
           
  //          catchError((error) => {
  //            const errorMessage =
  //              error?.error?.message ||   
  //              error?.message ||          
  //              'Login failed!'; 
 
  //            this.toast.error(errorMessage); 
 
  //            return of(
  //              loginAction.failedLogin()
  //            );
  //          })
  //        )
  //      )
  //    )
  //  );


  
  login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loginAction.login),

    exhaustMap((action: any) =>
      this.authServices.loginService(action.payload).pipe(

        // toast loader inside pipe
        this.toast.observe({
          loading: 'Logging...',
          success: 'Successfully logged in',
          error: 'Login failed!'
        }),

        map((res: any) =>
          loginAction.sucessLogin({ payload: res?.data })
        ),

        catchError((error) => {
          const errorMessage =
            error?.error?.message ||
            error?.message ||
            'Login failed!';

          // toast on error
          this.toast.error(errorMessage);

          return of(loginAction.failedLogin());
        })
      )
    )
  )
);


  
}
