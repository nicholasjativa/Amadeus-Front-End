import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { AmadeusState } from './store/reducers/root';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService,
              private store: Store<AmadeusState>){
  }

  ngOnInit(): void {
    if (this.authService.getCookie()) {
      
    } else {

    }
  }
}
