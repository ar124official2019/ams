import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private attendance: any = null;
  private date = new Date();
  private attendanceMap: Map<number, any[]> = new Map();

  constructor(private http: HttpClient) {}

  /**
   * Get an attendance of a particular date of current month
   */
  getAttendance(day: number = -1) {
    if (day < 1 || day > this.date.getDate()) day = this.date.getDate();
    let obs;

    // already downloaded
    if (this.attendance)
      obs = of(true);
    else
      obs = this.fetchAttendance();

    // downloaded and return
    return obs.pipe(
      map(() => this.attendanceMap.get(day) || [])
    );
  }

  /**
   * Get a summary of attendance in current month
   */
  getSummary(): any {
    let obs;

    if (this.attendance) obs = of(this.attendance);
    else obs = this.fetchAttendance();

    return obs.pipe(
      map((res: any) => {
        return {
          start: res.monthStart,
          end: res.monthEnd,
          selected: this.attendanceMap.get(this.date.getDate()) || [],
          calendar: (() => {
            let att: any[] = [];
            for (let i = res.monthStart; i <= res.monthEnd; i++)
              att.push({ key: i, count: (this.attendanceMap.get(i) || []).length });
            return att;
          })(),
        };
      })
    );
  }

  /**
   * Update an attendence (toggle `present`)
   */
  setAttendance(date: number, student: number) {
    const _date = new Date(this.date);
    _date.setDate(date);

    return this.http.put(`${environment.api}/attendance`, { date: _date.toDateString(), student })
      .pipe(
        tap((res: any) => {
          const items = (this.attendanceMap.get(date) || []);
          const index = items.findIndex(i => i.student == student);

          if (index >= 0 && !res) items.splice(index, 1);
          else if (res) items.push(res);
          this.attendanceMap.set(date, items);
        })
      );
  }

  /**
   * Downlaoad attendance from server
   */
  private fetchAttendance() {
    return this.http.get<any[]>(`${environment.api}/attendance`).pipe(
      tap((res: any) => {
        this.attendance = res;
        this.attendance.entries.map((i: any) => {
          const date = new Date(i.date).getDate();
          const arr: any[] = this.attendanceMap.get(date) || [];
          arr.push(i);
          this.attendanceMap.set(date, arr);
        });
      })
    );
  }
}
