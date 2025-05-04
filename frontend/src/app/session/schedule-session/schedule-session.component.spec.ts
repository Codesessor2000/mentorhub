import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSessionComponent } from './schedule-session.component';

describe('ScheduleSessionComponent', () => {
  let component: ScheduleSessionComponent;
  let fixture: ComponentFixture<ScheduleSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
