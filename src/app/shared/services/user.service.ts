import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './auth.service';
import { ReplaySubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AmadeusState } from '../../store/reducers/root';
import * as UserActions from '../../store/actions/user';

@Injectable()
export class UserService {
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private auth: AuthService, private http: HttpClient, private store: Store<AmadeusState>) {
  }

  public signIn(emailAddress: string, password: string): void {
    this.store.dispatch(new UserActions.UserSignIn({ emailAddress, password }));
  }

  public login(emailAddress: string, password: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/users/login`,
      { user: { emailAddress, password } }, { withCredentials: true });
  }

  public getUserInfo(): Observable<any> {
    return this.http.get(`${environment.API_URL}/users/user`);
  }

  // TODO: rename
  public populate(): void {
    if (this.auth.getCookie()) {
      this.getUserInfo().subscribe(
        (data) => this.setAuth(data['user']),
        (err) => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  public purgeAuth(): void {
    this.auth.destroyCookie();
    this.isAuthenticatedSubject.next(false);
  }

  public setAuth(user: any): void {console.log('um??')
    this.isAuthenticatedSubject.next(true);
  }


}
