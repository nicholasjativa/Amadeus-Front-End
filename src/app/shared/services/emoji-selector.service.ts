import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class EmojiSelectorService {
  public selectedEmojiObserver: Observer<any>;
  public selectedEmoji$: Observable<any>;
  public showPicker = false;

  constructor() {
    this.selectedEmoji$ = new Observable<any>(observer => {
      this.selectedEmojiObserver = observer;
    });
  }

  hideEmojiPicker() {
    this.showPicker = false;
  }

  showEmojiPicker() {
    this.showPicker = true;
  }

  toggleEmojiPicker() {
    this.showPicker = !this.showPicker;
  }

}
