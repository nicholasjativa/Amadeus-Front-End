import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../shared/services/messages.service';
import { ThreadsService } from '../../shared/services/threads.service';

@Component({
  selector: 'amadeus-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor(private cs: MessagesService, private threadsService: ThreadsService) { }

  ngOnInit() {
  }

  handleCreateNewConversationClick() {
    this.threadsService.createConversation();
  }

}
