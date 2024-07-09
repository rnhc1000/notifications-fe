import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOfDayComponent } from './time-of-day.component';

describe('TimeOfDayComponent', () => {
  let component: TimeOfDayComponent;
  let fixture: ComponentFixture<TimeOfDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeOfDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeOfDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
