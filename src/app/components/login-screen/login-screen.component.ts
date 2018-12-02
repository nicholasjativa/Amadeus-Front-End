import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'amadeus-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {
  public authForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.authForm = this.fb.group({
      emailAddress: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public ngOnInit(): void {  
  }

  public handleSignIn(): void {

    const emailAddress: string = this.authForm.value.emailAddress;
    const password: string = this.authForm.value.password;

    this.userService.signIn(emailAddress, password);
  }
  
}
