import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HotToastService } from '@ngxpert/hot-toast';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthServices } from '../../core/services/auth/auth-services';
import { registerAction } from './auth.actions';

@Injectable()
export class AuthRegisterEffect {

  private actions$ = inject(Actions);
  private authServices = inject(AuthServices);
  private toast = inject(HotToastService);

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
              error?.error?.message ||   
              error?.message ||          
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

  
}
