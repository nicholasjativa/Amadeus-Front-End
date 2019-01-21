import { Component, OnInit, Input } from '@angular/core';
import { BackPage } from '../../models/BackPage';

@Component({
  selector: 'amadeus-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  public title: string;
  @Input()
  public backPage: BackPage;

  constructor() { }

  ngOnInit() {
  }

}
