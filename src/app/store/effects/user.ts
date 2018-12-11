import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { UserActionTypes } from '../action-types/user';
import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';
import * as UserActions from '../actions/user';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private userService: UserService) {

    }

    @Effect()
    public signIn: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(UserActionTypes.SIGN_IN),
            map(action => action.payload),
            switchMap(({ emailAddress, password }) => {

                return this.userService.login(emailAddress, password)
                    .pipe(
                        map((user: User) => {

                            return new UserActions.UserSignInSuccess(user);
                        }),
                        catchError((error) => {
                            console.log(error);
                            return [new UserActions.UserSignInError({})];
                        })
                    );
                    
            })
        );

    @Effect()
    public signInSuccess: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(UserActionTypes.SIGN_IN_SUCCESS),
            map(action => action.payload),
            switchMap((user: User) => {

                this.router.navigateByUrl('/home');
                return [];
            })
        );

}