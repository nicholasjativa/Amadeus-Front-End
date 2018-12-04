import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConversationService } from '../../shared/services/conversation.service';
import { ConversationComponent } from '../conversation/conversation.component';
import { EmojiSelectorService } from '../../shared/services/emoji-selector.service';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ThreadsService } from '../../shared/services/threads.service';

@Component({
  selector: 'amadeus-response-area',
  templateUrl: './response-area.component.html',
  styleUrls: ['./response-area.component.css']
})

export class ResponseAreaComponent implements OnInit {
  @ViewChild('input') private input: ElementRef;
  public characterCount: number = 0;
  public message: string = '';
  public showEmojiPicker: boolean = false;
  public readonly: boolean;
  public toPhoneNumber: string;

  constructor(private cs: ConversationService, private threadsService: ThreadsService, private emoji: EmojiSelectorService) {
    this.threadsService.selectedConversationObservable
      .subscribe(conversation => this.toPhoneNumber = conversation.address);
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

  handleKeydown($event) {
    const enterKey: number = 13;
    if ($event.keyCode == enterKey) {
      if (this.message == '') {
        return;
      }

      this.characterCount = 0;
      this.cs.sendMessageToServer(this.toPhoneNumber, this.message);
      this.message = '';
      this.emoji.hideEmojiPicker();
    }
  }

  handleTextChange(text) {
    if (text.length >= 140) {
      this.characterCount = text.length;
    } else {
      this.characterCount = null;
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