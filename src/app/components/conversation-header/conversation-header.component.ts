import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'amadeus-conversation-header',
  templateUrl: './conversation-header.component.html',
  styleUrls: ['./conversation-header.component.css']
})
export class ConversationHeaderComponent implements OnInit {
  @ViewChild('nameInput') public nameInput: ElementRef;
  @Input() public headerInfo: any;

  constructor() {
  }

  public ngOnInit(): void {
  }

}
