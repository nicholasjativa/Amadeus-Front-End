import { Component, OnChanges, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'amadeus-conversation-header',
  templateUrl: './conversation-header.component.html',
  styleUrls: ['./conversation-header.component.css']
})
export class ConversationHeaderComponent implements OnChanges, OnInit {
  @ViewChild('nameInput') public nameInput: ElementRef;
  @Input() public headerInfo: any;
  @Input() public isEditing: boolean;
  @Output() public finishedEditing: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  public emitIfNeeded(): void {
    if (this.headerInfo.name) {
      this.finishedEditing.emit();
    }
  }

  public ngOnChanges(): void {
    
    if (this.isEditing) {
      this.nameInput.nativeElement.focus();
    }

  }
  
  public ngOnInit(): void {
  }

}
