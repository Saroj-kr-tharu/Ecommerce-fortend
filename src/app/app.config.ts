import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { AuthLoginEffect } from './store/auth/auth.login.effect';
import { loginReducer, registerReducer } from './store/auth/auth.reducer';
import { AuthRegisterEffect } from './store/auth/auth.register.effect';
import { cartReducer } from './store/custumer/cart.reducers';
import { getProductsEffect } from './store/custumer/cus.getProducts.effect';
import { getProductReducer } from './store/custumer/cus.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes), 
    provideAnimationsAsync(),
    providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
    provideHotToastConfig({
      duration: 1500 , 
      reverseOrder: true,
      dismissible: true,
      autoClose: true,
      position: 'bottom-center',
    }),
    provideEffects(AuthRegisterEffect, AuthLoginEffect, getProductsEffect),
    provideStore({
      RegisterReducer :registerReducer,
      LoginReducer :loginReducer,
      GetAllProductsReducer :getProductReducer,
      CartReducer :cartReducer,
    }),
    provideStoreDevtools({
      maxAge: 25, 
      logOnly: !isDevMode(), 
      autoPause: true,
      trace: false, 
      traceLimit: 75, 
      connectInZone: true 
    })
  ]
};
