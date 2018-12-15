import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'amadeus-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})

export class LoadingSpinnerComponent implements OnInit {
  @Input() public type: string;

  constructor() { }

  public ngOnInit(): void {
  }

}
