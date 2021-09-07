import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AttendanceService } from '../attendance.service';
import getCookieValue from '../get-cookie';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  date = new Date();
  summary: any = null;
  students: any[] = [];

  loading = 0; // used for showing spinner - when a request is ongoing
  presentCount = 0;
  absentCount = 0;

  login = false;

  constructor(private route: ActivatedRoute, private as: AttendanceService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((res: any) => {
      this.summary = res.summary;
      this.students = res.students;
      this.init();
    });

    if(getCookieValue('token')) this.login = true;
  }

  private init() {
    this.presentCount = 0;
    this.absentCount = 0;
    this.students.forEach(i => this.isPresent(i.id) ? this.presentCount++ : this.absentCount++);
  }

  isPresent(id: number) {
    return this.summary.selected.find((i: any) => i.student == id);
  }

  setPresent(id: number, value = false) {
    if ((value && this.isPresent(id)) || (!value && !this.isPresent(id)))
      return;

    this.loading = id;
    this.as.setAttendance(this.date.getDate(), id).subscribe((res) => {
      if (!res) {
        const index = this.summary.selected.findIndex((i: any) => i.student == id);
        if (index >= 0) this.summary.selected.splice(index, 1);
        this.absentCount++;
        this.presentCount--;
      } else {
        this.summary.selected.push(res);
        this.absentCount--;
        this.presentCount++;
      }

      this.loading = 0;
    }, (_err) => {
      this.loading = 0;
    });
  }

  /**
   * Change selected date
   */
  changeDate($event: number) {
    this.as.getAttendance($event).subscribe((entries: any[]) => {
      const date = new Date();
      date.setDate($event);
      this.date = date;

      this.summary = {
        ...this.summary,
        selected: entries
      };

      this.init();
    });
  }
}
