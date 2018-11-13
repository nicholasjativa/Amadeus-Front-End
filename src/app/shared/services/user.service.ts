import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './auth.service';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable()
export class UserService {
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private auth: AuthService, private http: HttpClient) {
  }

  login(credentials) {
    return this.http.post(`${environment.API_URL}/users/login`, { user: credentials }, { withCredentials: true })
      .map((data: HttpResponse<any>) => {
        this.isAuthenticatedSubject.next(true);
        return data;
      });
  }

  getUserInfo() {
    return this.http.get(`${environment.API_URL}/users/user`);
  }

  // TODO: rename
  populate(): void {
    if (this.auth.getCookie()) {
      this.getUserInfo().subscribe(
        (data) => this.setAuth(data['user']),
        (err) => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  purgeAuth(): void {
    this.auth.destroyCookie();
    this.isAuthenticatedSubject.next(false);
  }

  setAuth(user: any): void {
    this.isAuthenticatedSubject.next(true);
  }


}
