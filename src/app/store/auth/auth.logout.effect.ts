import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HotToastService } from '@ngxpert/hot-toast';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthServices } from '../../core/services/auth/auth-services';
import { logoutAction } from './auth.actions';

@Injectable()
export class LogoutEffect {

  private actions$ = inject(Actions);
  private authServices = inject(AuthServices);
  private toast = inject(HotToastService);
  private router = inject(Router)


  
  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(logoutAction.logout),

    exhaustMap(() =>
      this.authServices.logoutService().pipe(

        // toast loader inside pipe
        this.toast.observe({
          loading: 'Logout...',
          success: 'Successfully Logout',
          error: 'Logout failed!'
        }),

        map(() =>
               logoutAction.sucesslogout()
        ),

        catchError((error) => {
          const errorMessage =
           
            'Logout failed!';

          
          this.toast.error(errorMessage);

          return of(logoutAction.faillogout());
        })
      )
    )
  )
);



  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction.sucesslogout),
        tap(() => {
            localStorage.removeItem('marketManduAuth')
            console.log('sucessfully logout ==> effect ')
            this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );




  
}

