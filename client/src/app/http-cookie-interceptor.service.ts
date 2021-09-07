import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpCookieInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      req.clone({
        withCredentials: true
      })
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.router.navigateByUrl('/login');
        }

        const error = err.error && err.error.code && err.error.message ? err.error.message : 'Sorry, something went wrong!';
        throw error;
      })
    );;
  }
}
