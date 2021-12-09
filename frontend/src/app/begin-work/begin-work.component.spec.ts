import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeginWorkComponent } from './begin-work.component';

describe('BeginWorkComponent', () => {
  let component: BeginWorkComponent;
  let fixture: ComponentFixture<BeginWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeginWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeginWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
