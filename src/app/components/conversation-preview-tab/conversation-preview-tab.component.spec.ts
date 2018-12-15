import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationPreviewTabComponent } from './conversation-preview-tab.component';

describe('ConversationPreviewTabComponent', () => {
  let component: ConversationPreviewTabComponent;
  let fixture: ComponentFixture<ConversationPreviewTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationPreviewTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationPreviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
