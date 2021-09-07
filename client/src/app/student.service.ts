import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get<any[]>(`${environment.api}/student`).pipe(
      map((i: any[]) => {
        i.sort((a: any, b: any) => {
          if (a.id < b.id) return -1;
          else if (a.id > b.id) return 1;
          return 0;
        });

        return i;
      })
    );
  }
}
