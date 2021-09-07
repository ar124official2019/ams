import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class StudentResolverService implements Resolve<any> {

  constructor(private student: StudentService) { }

  resolve() {
    return this.student.getStudents();
  }
}
