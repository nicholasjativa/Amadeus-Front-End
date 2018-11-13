import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadTabComponent } from './thread-tab.component';

describe('ThreadTabComponent', () => {
  let component: ThreadTabComponent;
  let fixture: ComponentFixture<ThreadTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
