import { Component, OnInit } from '@angular/core';
import { BackPage } from '../../models/BackPage';

@Component({
  selector: 'amadeus-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public backPage: BackPage = {
    name: "Messages",
    route: "/home"
  };

  constructor() { }

  ngOnInit() {
  }

}
