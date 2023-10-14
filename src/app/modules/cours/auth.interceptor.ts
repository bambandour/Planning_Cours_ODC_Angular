import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private login:LoginService){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =this.login.getToken; 
    // const user=localStorage.getItem('user')
    if (token) {
        console.log(token);
        request.clone({
        headers:request.headers.set('Authorization','Bearer:'+token)
        });
    }
    return next.handle(request);
  }
}
