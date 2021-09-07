import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.http.post(`${environment.api}/auth/login/email`, {
      email: this.email,
      password: this.password
    }).subscribe((res) => {
      this.router.navigateByUrl('/');
    }, (e) => {
      this.error = e?.message || 'Invalid email or password!';
    });
  }
}
