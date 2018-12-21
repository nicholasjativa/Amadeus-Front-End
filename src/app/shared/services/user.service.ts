import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { ReplaySubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AmadeusState } from '../../store/reducers/root';
import * as UserActions from '../../store/actions/user';
import { AccountCreationData } from '../../models/accountCreationData';

@Injectable()
export class UserService {
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private auth: AuthService, private http: HttpClient, private store: Store<AmadeusState>) {
  }

  public createNewAccount(data: AccountCreationData): Observable<any> {
    return this.http.post(`${environment.API_URL}/users/create-account`, data);
  }

  public signIn(emailAddress: string, password: string): void {
    this.store.dispatch(new UserActions.UserSignIn({ emailAddress, password }));
  }

  public login(emailAddress: string, password: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/users/login`,
      { emailAddress, password }, { withCredentials: true });
  }

  public getUserInfo(): Observable<any> {
    return this.http.get(`${environment.API_URL}/users/user`);
  }

}
