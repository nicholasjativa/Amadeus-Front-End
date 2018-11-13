import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../shared/services/conversation.service';
import { SidebarService } from '../../shared/services/sidebar.service';

@Component({
  selector: 'amadeus-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public selectedConversation;
  public conversations: any[];

  constructor(private cs: ConversationService, private sidebarService: SidebarService) {
    this.sidebarService.selectedConversationObservable
      .subscribe(conversation => {
        this.selectedConversation = conversation;
      });
    this.getConversationsList();
    this.updateSidebar();
  }

  ngOnInit() {
  }

  getConversationsList(): void {
    this.sidebarService.getConversationsList()
      .subscribe((conversations: any[]) => {
        this.conversations = conversations;
        this.sidebarService.setSelectedConversation(conversations[0]);
      });

  }

  handleConversationClick(conversation): void {
    this.sidebarService.setSelectedConversation(conversation);
  }

  updateSidebar(): void {
    this.sidebarService.listenForSnippetUpdates()
      .subscribe(message => {
        for (let i = 0; i < this.conversations.length; i++) {
          if (message.address == this.conversations[i].address) {
            this.conversations[i].body = message.body;
            this.conversations[i].timestamp = new Date(parseInt(message.timestamp)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            return;
          } 
        }
        // snippet does not exist
        this.conversations.push(message);
      });
  }

}
