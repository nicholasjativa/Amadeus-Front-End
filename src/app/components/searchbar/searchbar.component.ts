import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'amadeus-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})

export class SearchbarComponent implements OnInit {
  @Output() public createNewConversationClick: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  public ngOnInit(): void {
  }

}
