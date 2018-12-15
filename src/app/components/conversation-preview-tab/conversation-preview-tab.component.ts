import { Component, Input, OnInit } from '@angular/core';
import { ConversationPreview } from '../../models/conversation-preview';

@Component({
  selector: 'amadeus-conversation-preview-tab',
  templateUrl: './conversation-preview-tab.component.html',
  styleUrls: ['./conversation-preview-tab.component.css']
})
export class ConversationPreviewTabComponent implements OnInit {
  @Input() public conversationPreview: ConversationPreview;

  constructor() {
  }

  public ngOnInit(): void {
  }

}
