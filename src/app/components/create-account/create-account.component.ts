import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmadeusState, selectUserState } from '../../store/reducers/root';
import { Store, select } from '@ngrx/store';
import * as UserActions from '../../store/actions/user';
import { AccountCreationData } from '../../models/accountCreationData';
import { Observable } from 'rxjs';
import { UserState } from '../../store/reducers/user';

@Component({
  selector: 'amadeus-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  public accountCreationLoading: boolean;
  public accountCreationSuccess: boolean;
  public createAccountForm: FormGroup;
  private getUserState: Observable<UserState>;
  public reasons: any = [
    {
      subtitle: 'Text from any browser',
      description: `Amadeus makes it easy to send a text message straight from your laptop,
      computer, or anywhere you have access to a web browser. If you love texting, you'll love
      how easy it is with Amadeus.`
    },
    {
      subtitle: 'Stay updated 24/7',
      description: `Amadeus is real-time, which means it'll update with any messages that your phone
      receives or sends out. That means you'll never miss out on what your phone is saying.`
    },
    {
      subtitle: 'Signing up is easy',
      description: `Sign up, download the Amadeus Android application, login, and you'll be all set. Setting up
      takes less than 5 minutes, and then you'll be ready to start texting from anywhere.`
    }
  ];

  constructor(private fb: FormBuilder, private store: Store<AmadeusState>) {
    this.getUserState = this.store.pipe(select(selectUserState));
    this.createAccountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    this.getUserState.subscribe(state => {
      this.accountCreationLoading = state.accountCreationLoading
      this.accountCreationSuccess = state.accountCreationSuccess;
      
      if (this.accountCreationSuccess) {
        this.createAccountForm.reset();
      }
      
    });
  }

  public createAccount(): void {

    if (this.createAccountForm.valid) {

      const accountCreationData: AccountCreationData = this.createAccountForm.value;
      this.store.dispatch(new UserActions.CreateNewAccount(accountCreationData));
    }

  }

}
