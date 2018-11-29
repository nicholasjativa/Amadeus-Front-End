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

  public hideEmojiPicker(): void {
    this.showPicker = false;
  }

  public showEmojiPicker(): void {
    this.showPicker = true;
  }

  public toggleEmojiPicker(): void {
    this.showPicker = !this.showPicker;
  }

}
