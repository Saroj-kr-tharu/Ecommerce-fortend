import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLogin } from '../../store/auth/auth.selectors';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  
  let token: string | null = store.selectSignal(selectLogin)()?.users?.jwt || null;
  
  if (!token) {
    const stored = localStorage.getItem('marketManduAuth');
    if (stored) 
        token = JSON.parse(stored)?.jwt || null;
  }

 
  const newReq = token
    ? req.clone({ setHeaders: { 'x-access-token': token } })
    : req;

  return next(newReq);
};
