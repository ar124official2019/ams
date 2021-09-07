import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceResolveService } from './attendance-resolve.service';
import { AttendanceComponent } from './attendance/attendance.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { StudentResolverService } from './student-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: AttendanceComponent,
    resolve: {
      summary: AttendanceResolveService,
      students: StudentResolverService
    }
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'logout',
    component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
