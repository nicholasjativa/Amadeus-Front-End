import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.auth.getCookie();

    if (token) {
      headersConfig['Authorization'] = `Token ${token}`;
      const authReq = req.clone({
        setHeaders: headersConfig,
        withCredentials: true
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}