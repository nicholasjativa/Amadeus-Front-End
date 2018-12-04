import { Component, OnInit, Input } from '@angular/core';
import { ConversationService } from '../../shared/services/conversation.service';
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
  @Input() public threads: Thread[];

  constructor(private cs: ConversationService,
              private threadsService: ThreadsService) {
    this.threadsService.selectedConversationObservable
      .subscribe(conversation => {
        this.selectedThread = conversation;
      });
    this.updateSidebar();
  }

  public ngOnInit(): void {
  }

  handleConversationClick(conversation): void {
    this.threadsService.setSelectedConversation(conversation);
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
