import { HttpInterceptorFn } from '@angular/common/http';
import { selectLogin } from '../../store/auth/auth.selectors';
import { sucessLoginType } from '../models/auth.model';


import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return store.select(selectLogin).pipe(
    map((data) => {
      let token = data?.users?.jwt;
      // console.log('data => ', token )
      
      if (!token) {
        const localData: sucessLoginType | null = JSON.parse(localStorage.getItem('marketManduAuth') || 'null');
        token = localData?.jwt;
        // console.log('datatoken  => ', token )
      }

      const newReq = req.clone({
        setHeaders: {
          'x-access-token': token || '',
        }
      });
      return newReq;
    }),
    switchMap((newReq) => next(newReq))
  );


};
