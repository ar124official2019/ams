import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceHeaderComponent } from './attendance-header.component';

describe('AttendanceHeaderComponent', () => {
  let component: AttendanceHeaderComponent;
  let fixture: ComponentFixture<AttendanceHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
