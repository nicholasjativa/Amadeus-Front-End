import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'amadeus-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.css']
})
export class EmojiPickerComponent implements OnInit {
  @Output() public emojiSelected: EventEmitter<string> = new EventEmitter<string>();
  public emojiList: string[];

  constructor(private elementRef: ElementRef) {
    this.createEmojiList();
  }

  public ngOnInit(): void {
  }

  createEmojiList() {
    this.emojiList = ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🤔', '😑', '🙄', '😫', '😴', '😤', '😢', '😭', '😦', '😧', '😨', '😱', '😷', '🙈', '🙉', '🙊', '❤️'];
  }

}
