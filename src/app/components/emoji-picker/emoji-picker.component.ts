import { Component, Input, OnInit } from '@angular/core';
import { EmojiSelectorService } from '../../shared/services/emoji-selector.service';
import { ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'amadeus-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.css']
})
export class EmojiPickerComponent implements OnInit {
  public emojiList: any[];

  /*@HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.elementRef.nativeElement.contains(event.target)) {
      console.log('clicked inside');
    } else {
      
      //this.emoji.hideEmojiPicker();
    }
  }*/

  constructor(private elementRef: ElementRef, public emoji: EmojiSelectorService) {
    this.createEmojiList();
  }

  ngOnInit() {
  }

  createEmojiList() {
    this.emojiList = ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🤔', '😑', '🙄', '😫', '😴', '😤', '😢', '😭', '😦', '😧', '😨', '😱', '😷', '🙈', '🙉', '🙊', '❤️'];
  }

  handleEmojiClick(emoji) {
    this.emoji.selectedEmojiObserver.next(emoji);
  }

}
