import { TestBed } from '@angular/core/testing';

import { HttpCookieInterceptorService } from './http-cookie-interceptor.service';

describe('HttpCookieInterceptorService', () => {
  let service: HttpCookieInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCookieInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
