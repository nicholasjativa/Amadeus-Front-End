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
  authForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.authForm = this.fb.group({
      'emailAddress': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {  
  }

  handleSubmit() {
    const credentials = this.authForm.value;
    this.userService.login(credentials).subscribe(data => {
      if (data['user']) {
        this.router.navigateByUrl('/home');
      }
    });
  }



}
