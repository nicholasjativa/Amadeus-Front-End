import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amadeus-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @Input() shouldDisplayTime: boolean = false;
  @Input() shouldShowDelivered: boolean = false;
  @Input() textInfo;
  date;
  now;
  time;
  constructor() {
   }

  ngOnInit() {
    let dateTime = new Date(parseInt(this.textInfo.timestamp));
    this.now = new Date().toDateString();
    this.date = dateTime.toDateString();
    this.time = dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

}
