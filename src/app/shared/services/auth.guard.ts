import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {

  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isAuthenticated
      .pipe(take(1))
      .map((isAuthenticated: boolean) => {
        if (isAuthenticated) {

          return true

        } else {
          
          this.router.navigateByUrl('/login');
          
          return false;
        
        }
      });
  }
}
