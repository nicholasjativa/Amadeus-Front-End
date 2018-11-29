import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amadeus-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @Input() shouldDisplayTime: boolean = false;
  @Input() shouldShowDelivered: boolean = false;
  @Input() textInfo: any;
  public date: string;
  public now: string;
  public time: string;
  constructor() {
   }

  public ngOnInit(): void {
    let dateTime: Date = new Date(parseInt(this.textInfo.timestamp));
    this.now = new Date().toDateString();
    this.date = dateTime.toDateString();
    this.time = dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }

}
