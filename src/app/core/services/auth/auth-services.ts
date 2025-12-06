import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { registerType } from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  
  httpClient = inject(HttpClient)

  BaseUrl = `${environment.apiURL}/auth`;

  registerService(data: registerType) {
    const url = `${this.BaseUrl}/signup`
    console.log('url => ', url , ' and data => ', data)
    return  this.httpClient.post(url, data) ; 
  }

  loginService(data: registerType) {
    const url = `${this.BaseUrl}/login`
    return  this.httpClient.post(url, data) ; 
  }
    logoutService() {
      const url = `${this.BaseUrl}/logout`
    return  this.httpClient.post(url, {}) ; 
  }

  verifyService() {
    const url = `${this.BaseUrl}/veriyToken`
    return  this.httpClient.get(url) ; 
  }

}
