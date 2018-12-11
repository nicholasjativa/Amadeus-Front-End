import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Thread } from '../../models/thread';

@Component({
  selector: 'amadeus-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() public currentlySelectedConversationPhoneNumber: string;
  @Input() public threads: Thread[];
  @Output() public setThreadAsSelected: EventEmitter<Thread> = new EventEmitter<Thread>();

  constructor() {
  }

  public ngOnInit(): void {
  }

}
