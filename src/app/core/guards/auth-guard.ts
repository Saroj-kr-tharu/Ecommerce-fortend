import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { selectLogin } from '../../store/auth/auth.selectors';
import { sucessLoginType } from '../models/auth.model';

import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';


export const authGuard: CanActivateFn  = (route, state) => {

  const router = inject(Router)
  const toast =  inject(HotToastService);
  const store = inject(Store)
  
 

  return store.select(selectLogin).pipe(
    map((state) => {
      console.log('auth guard => here  ')
      // 1. Check store
      if (state?.isLogin) return true;

      // 2. Check localStorage fallback
      const localData: sucessLoginType | null =
        JSON.parse(localStorage.getItem('marketManduAuth') || 'null');

      if (localData?.jwt) return true;

      // 3. Block access if neither present
      toast.warning('Please Login ! ')
      return false;
    })
  );


};
