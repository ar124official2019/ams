import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AttendanceService } from './attendance.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceResolveService implements Resolve<any> {

  constructor(private attandance: AttendanceService) { }

  resolve(): any {
    return this.attandance.getSummary();
  }
}
