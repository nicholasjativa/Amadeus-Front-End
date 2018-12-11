import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmojiSelectorService } from '../../shared/services/emoji-selector.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'amadeus-response-area',
  templateUrl: './response-area.component.html',
  styleUrls: ['./response-area.component.css']
})

export class ResponseAreaComponent implements OnInit {
  @Output() public sendMessage: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('input') public input: ElementRef;
  public characterCount: number = 0;
  public message: string;
  public showEmojiPicker: boolean = false;
  public readonly: boolean;

  constructor(private emoji: EmojiSelectorService) {

  }

  ngOnInit() {
    this.emoji.selectedEmoji$.subscribe(emoji => {
      this.input.nativeElement.focus();
      this.message = this.message.concat(emoji);
    });
  }

  handleClick() {
    this.readonly = false;
  }

  public handleKeydown($event: KeyboardEvent): void {
    const enterKey: number = 13;
    if ($event.keyCode == enterKey && this.message) {
      this.sendMessage.emit(this.message);
      this.characterCount = 0;
      this.message = '';
    }
  }

  public handleTextChange(text): void {
    if (text.length >= 140) {
      this.characterCount = text.length;
    } else {
      this.characterCount = 0;
    }
  }

  togglePicker($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();

    this.readonly = true;
    this.emoji.toggleEmojiPicker();
    this.input.nativeElement.focus();
  }

}