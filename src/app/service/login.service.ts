import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private routes: Router,
    private cookieService : CookieService
  ) { }

  public setCookie(key: string, value: string) {
    this.cookieService.set(key, value);
  }
}
