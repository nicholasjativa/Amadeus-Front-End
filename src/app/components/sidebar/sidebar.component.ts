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
  public selectedThread;
  @Input() public currentlySelectedConversationPhoneNumber: string;
  @Input() public threads: Thread[];
  @Output() public load: EventEmitter<Thread> = new EventEmitter<Thread>();

  constructor(private cs: MessagesService,
              private threadsService: ThreadsService) {
    this.threadsService.selectedConversationObservable
      .subscribe(conversation => {
        this.selectedThread = conversation;
      });
    this.updateSidebar();
  }

  public ngOnInit(): void {
  }

  updateSidebar(): void {
    this.threadsService.listenForSnippetUpdates()
      .subscribe(message => {
        for (let i = 0; i < this.threads.length; i++) {
          if (message.address == this.threads[i].address) {
            this.threads[i].body = message.body;
            this.threads[i].timestamp = new Date(parseInt(message.timestamp)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            return;
          }
        }
        // snippet does not exist
        this.threads.push(message);
      });
  }

}
