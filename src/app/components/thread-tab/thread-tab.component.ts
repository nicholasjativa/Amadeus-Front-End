import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'amadeus-thread-tab',
  templateUrl: './thread-tab.component.html',
  styleUrls: ['./thread-tab.component.css']
})
export class ThreadTabComponent implements OnInit {
  @Input() conversationInfo;

  constructor() { 
  }

  ngOnInit() {
  }

}
