import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../shared/services/conversation.service';
import { ThreadsService } from '../../shared/services/threads.service';

@Component({
  selector: 'amadeus-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor(private cs: ConversationService, private threadsService: ThreadsService) { }

  ngOnInit() {
  }

  handleCreateNewConversationClick() {
    this.threadsService.createConversation();
  }

}
