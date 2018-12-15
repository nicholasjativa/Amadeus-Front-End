import { Component, Input, OnInit } from '@angular/core';
import { Thread } from '../../models/thread';

@Component({
  selector: 'amadeus-conversation-preview-tab',
  templateUrl: './conversation-preview-tab.component.html',
  styleUrls: ['./conversation-preview-tab.component.css']
})
export class ConversationPreviewTabComponent implements OnInit {
  @Input() public thread: Thread;

  constructor() {
  }

  public ngOnInit(): void {
  }

}
