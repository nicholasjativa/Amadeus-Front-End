import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageContainerHeaderComponent } from './message-container-header.component';

describe('MessageContainerHeaderComponent', () => {
  let component: MessageContainerHeaderComponent;
  let fixture: ComponentFixture<MessageContainerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageContainerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageContainerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
