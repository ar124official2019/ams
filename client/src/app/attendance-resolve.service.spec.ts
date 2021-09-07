import { TestBed } from '@angular/core/testing';

import { AttendanceResolveService } from './attendance-resolve.service';

describe('AttendanceResolveService', () => {
  let service: AttendanceResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
