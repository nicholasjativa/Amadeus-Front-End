import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../shared/services/conversation.service';
import { SidebarService } from '../../shared/services/sidebar.service';

@Component({
  selector: 'amadeus-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor(private cs: ConversationService, private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  handleCreateNewConversationClick() {
    this.sidebarService.createConversation();
  }

}
