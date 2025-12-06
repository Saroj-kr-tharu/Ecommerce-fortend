import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HotToastService } from '@ngxpert/hot-toast';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { selectLogin } from '../../store/auth/auth.selectors';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const http = inject(HttpClient);
  const toast = inject(HotToastService)
  const router = inject(Router)

  // 1️⃣ GET ACCESS TOKEN
  let token: string | null = store.selectSignal(selectLogin)()?.users?.jwt || null;
  if (!token) {
    const stored = localStorage.getItem('marketManduAuth');
    if (stored) {
      token = JSON.parse(stored)?.jwt || null;
    }
  }

  // 2️⃣ Clone request with credentials for ALL requests
  let authReq = req.clone({
    withCredentials: true  // ✅ Always include credentials (cookies)
  });

  // 3️⃣ Add access token header EXCEPT for refresh endpoint
  const isRefreshEndpoint = req.url.includes('/auth/refresh-token');
  
  if (token && !isRefreshEndpoint) {
    authReq = authReq.clone({
      setHeaders: {
        'x-access-token': token
      }
    });
  }

  // 4️⃣ Handle the request + catch errors
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isRefreshEndpoint) {
        // First 401 request triggers refresh
        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          // ✅ Call refresh - withCredentials already set by interceptor
          return http.post<any>(`${environment.apiURL}/auth/refresh-token`, {}).pipe(
            switchMap((res) => {
              isRefreshing = false;
              const newAccessToken = res.data.jwt;
              
              // Save new access token
              localStorage.setItem('marketManduAuth', JSON.stringify(res.data));

              refreshTokenSubject.next(newAccessToken);

              // Retry original request with new token
              return next(
                req.clone({
                  withCredentials: true,
                  setHeaders: {
                    'x-access-token': newAccessToken  
                  }
                })
              );
            }),
            catchError((refreshError) => {
              isRefreshing = false;
              refreshTokenSubject.next(null);
              localStorage.removeItem('marketManduAuth');
              toast.error('Session Expire')
              router.navigate(['/login']);
              return throwError(() => refreshError);
            })
          );
        }

        // Wait for refresh to complete
        return refreshTokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap((newToken) => {
            return next(
              req.clone({
                withCredentials: true,
                setHeaders: {
                  'x-access-token': newToken! 
                }
              })
            );
          })
        );
      }

      return throwError(() => error);
    })
  );
};