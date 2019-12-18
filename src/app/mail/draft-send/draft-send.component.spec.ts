import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftSendComponent } from './draft-send.component';

describe('DraftSendComponent', () => {
  let component: DraftSendComponent;
  let fixture: ComponentFixture<DraftSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
