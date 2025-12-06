import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HotToastService } from '@ngxpert/hot-toast';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthServices } from '../../core/services/auth/auth-services';
import { loginAction, restoreSessionAction } from './auth.actions';

@Injectable()
export class AuthLoginEffect {

  private actions$ = inject(Actions);
  private authServices = inject(AuthServices);
  private toast = inject(HotToastService);
  private router = inject(Router)


  
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
           
            'Login failed!';

          
          this.toast.error(errorMessage);

          return of(loginAction.failedLogin());
        })
      )
    )
  )
);



  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginAction.sucessLogin),
        tap((action) => {
          console.log('action => ',action?.payload?.role)
          if(action?.payload?.role?.toLowerCase() === 'admin') 
            this.router.navigateByUrl('/admin/dashboard');
          else
            this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );


  restoreSess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(restoreSessionAction.restoreSession),
       
      ),
     { dispatch: false }
    );



    

  
}
