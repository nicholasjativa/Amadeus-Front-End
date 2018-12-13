import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ElementRef, HostListener } from '@angular/core';


@Component({
  selector: 'amadeus-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.css']
})
export class EmojiPickerComponent implements OnInit {
  public emojiList: string[];
  @Input() public showEmojiPicker: boolean;
  @Output() public emojiSelected: EventEmitter<string> = new EventEmitter<string>();
  @HostListener('document:click', ['$event'])
  private clickout(event: any) {

    const clickedEl: HTMLElement = event.target;

    if (this.showEmojiPicker && !clickedEl.classList.contains('emoji-picker-launcher')) {

      // this will hide the emoji picker by triggering
      // the togglePicker function on parent
      this.emojiSelected.emit(''); 
    }
  }

  constructor(private elementRef: ElementRef) {
    this.createEmojiList();
  }

  public ngOnInit(): void {
  }

  createEmojiList() {
    this.emojiList = ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🤔', '😑', '🙄', '😫', '😴', '😤', '😢', '😭', '😦', '😧', '😨', '😱', '😷', '🙈', '🙉', '🙊', '❤️'];
  }

}
