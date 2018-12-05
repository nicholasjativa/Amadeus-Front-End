import { Component, Input, OnInit } from '@angular/core';
import { Thread } from '../../models/thread';

@Component({
  selector: 'amadeus-thread-tab',
  templateUrl: './thread-tab.component.html',
  styleUrls: ['./thread-tab.component.css']
})
export class ThreadTabComponent implements OnInit {
  @Input() thread: Thread;

  constructor() { 
  }

  public ngOnInit(): void {
  }

}
