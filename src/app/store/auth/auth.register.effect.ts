import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HotToastService } from '@ngxpert/hot-toast';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthServices } from '../../core/services/auth/auth-services';
import { logoutAction, registerAction } from './auth.actions';

@Injectable()
export class AuthRegisterEffect {

  private actions$ = inject(Actions);
  private authServices = inject(AuthServices);
  private toast = inject(HotToastService);
  private  router = inject(Router)

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction.register),
     
      exhaustMap((action: any) =>

        this.authServices.registerService(action.payload).pipe(
          
          this.toast.observe({
            loading: 'Registering...',
            success: 'Sucessfully Register',
            error: 'Register failed!',
          }),

          map((res: any) =>
            registerAction.sucessRegister()
          ),

          
          catchError((error) => {
            const errorMessage =
                       
              'Registration failed!'; 

            this.toast.error(errorMessage); 

            return of(
              registerAction.failedRegister()
            );
          })
        )
      )
    )
  );


  sucessRegister$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(registerAction.sucessRegister),
          tap((action) => {
            
              this.router.navigateByUrl('/login');
          })
        ),
      { dispatch: false }
    );

  
}



export class LogoutEffect {

  private actions$ = inject(Actions);
  private authServices = inject(AuthServices);
  private toast = inject(HotToastService);
  private  router = inject(Router)

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutAction.logout),
     
      exhaustMap((action: any) =>

        this.authServices.logoutService().pipe(
          
          this.toast.observe({
            loading: 'Logouting...',
            success: 'Sucessfully logout',
            error: 'Failed to Logout!',
          }),

          map((res: any) =>
            logoutAction.sucessfullyLogout()
          ),

          
          catchError((error) => {
            const errorMessage =
                       
              'Registration failed!'; 

              this.toast.error(errorMessage); 

            return of(
              logoutAction.failedLogout()
            );
          })
        )
      )
    )
  );


  sucessRegister$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(registerAction.sucessRegister),
          tap((action) => {
            
              this.router.navigateByUrl('/login');
          })
        ),
      { dispatch: false }
    );

  
}