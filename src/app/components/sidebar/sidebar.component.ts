import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessagesService } from '../../shared/services/messages.service';
import { ThreadsService } from '../../shared/services/threads.service';
import { Store } from '@ngrx/store';
import { AmadeusState } from '../../store/reducers/root';
import { Thread } from '../../models/thread';

@Component({
  selector: 'amadeus-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() public currentlySelectedConversationPhoneNumber: string;
  @Input() public threads: Thread[];
  @Output() public load: EventEmitter<Thread> = new EventEmitter<Thread>();

  constructor() {
  }

  public ngOnInit(): void {
  }

}
