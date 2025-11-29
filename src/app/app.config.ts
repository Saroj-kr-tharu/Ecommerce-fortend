import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { routes } from './app.routes';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideHotToastConfig({
      duration: 2000 , 
      reverseOrder: true,
      dismissible: true,
      autoClose: true,
      position: 'bottom-center',
    }),
    provideEffects(),
    provideStore({}),
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
