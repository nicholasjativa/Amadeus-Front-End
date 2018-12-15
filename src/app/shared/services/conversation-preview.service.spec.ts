import { TestBed, inject } from '@angular/core/testing';

import { ConversationPreviewService } from './conversation-preview.service';

describe('ConversationPreviewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversationPreviewService]
    });
  });

  it('should be created', inject([ConversationPreviewService], (service: ConversationPreviewService) => {
    expect(service).toBeTruthy();
  }));
});
