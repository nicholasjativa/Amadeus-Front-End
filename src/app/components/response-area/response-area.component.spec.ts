import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseAreaComponent } from './response-area.component';

describe('ResponseAreaComponent', () => {
  let component: ResponseAreaComponent;
  let fixture: ComponentFixture<ResponseAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
