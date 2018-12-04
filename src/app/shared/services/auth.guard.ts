import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AmadeusState, selectUserState } from '../../store/reducers/root';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store<AmadeusState>) {

  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      return this.store.select(selectUserState)
        .map(state => {return true;
          if (state.isAuthenticated) {
            return true;
          } else {
            this.router.navigateByUrl('/login');
            return false;
          }
        });

  }
}
