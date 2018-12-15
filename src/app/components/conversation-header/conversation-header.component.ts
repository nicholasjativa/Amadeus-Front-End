import { Component, OnChanges, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'amadeus-conversation-header',
  templateUrl: './conversation-header.component.html',
  styleUrls: ['./conversation-header.component.css']
})
export class ConversationHeaderComponent implements OnChanges, OnInit {
  @ViewChild('nameInput') public nameInput: ElementRef;
  @Input() public headerInfo: any;
  @Input() public isEditing: boolean;

  constructor() {
  }

  public ngOnChanges(): void {
    
    if (this.isEditing) {
      this.nameInput.nativeElement.focus();
    }

  }

  public ngOnInit(): void {
  }

}
