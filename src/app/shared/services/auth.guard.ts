import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { AmadeusState } from '../../store/reducers/root';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { selectUserState } from '../../store/reducers/user';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private store: Store<AmadeusState>) {

  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.store
      .pipe(
        select(selectUserState),
        map(state => {

          if (state.isAuthenticated) {

            return true;

          } else {

            this.router.navigateByUrl('/login');
            return false;
          }
        })
      );

  }
}
