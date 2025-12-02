import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HotToastService } from '@ngxpert/hot-toast';
import { map } from 'rxjs/operators';
import { selectLogin } from '../../store/auth/auth.selectors';
import { sucessLoginType } from '../models/auth.model';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const toast =  inject(HotToastService);
  const store = inject(Store)
  
   return store.select(selectLogin).pipe(
     map((state) => {
      //  console.log('auth guard => here  ')
       if (!state?.isLogin) {
        toast.warning('please login   ! ');
        return false ;
       }
       // 1. Check store
       if (state?.isAdmin) return true;
 
       // 2. Check localStorage fallback
       const localData: sucessLoginType | null =
         JSON.parse(localStorage.getItem('marketManduAuth') || 'null');
 
       if (localData?.role?.toLowerCase() === 'admin') return true;
 
       // 3. Block access if neither present
       toast.warning('You are not admin  ! ')
       return false;
     })
   );


};
