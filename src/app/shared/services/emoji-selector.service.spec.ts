import { TestBed, inject } from '@angular/core/testing';

import { EmojiSelectorService } from './emoji-selector.service';

describe('EmojiSelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmojiSelectorService]
    });
  });

  it('should be created', inject([EmojiSelectorService], (service: EmojiSelectorService) => {
    expect(service).toBeTruthy();
  }));
});
