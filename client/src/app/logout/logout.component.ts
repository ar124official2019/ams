import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.http.post(`${environment.api}/auth/logout`, {})
      .subscribe((_res) => {
        window.location.href = '/';
      });
  }

  ngOnInit(): void {
  }

}
