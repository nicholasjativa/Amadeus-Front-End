import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessagesService } from '../../shared/services/messages.service';
import { ThreadsService } from '../../shared/services/threads.service';

@Component({
  selector: 'amadeus-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  @Output() public createNewConversationClick: EventEmitter<any> = new EventEmitter();
  
  constructor(private cs: MessagesService, private threadsService: ThreadsService) { }

  public ngOnInit(): void {
  }

}
