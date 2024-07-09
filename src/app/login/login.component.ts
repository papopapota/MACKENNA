import { Component } from '@angular/core';
import { routes } from '../app.routes';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private routes: Router,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) { }
  passwordStored: string = 'p{}sBQBdL2Whxvi@';
  password: string = '';
  error: string = '';

  ngOnInit() {
    const userSession = this.cookieService.get('UserIn');
    if (userSession == 'false') {
      this.toastr.error('Debes iniciar sesión', 'Error');
    }
  }

  Loguear() {
    if (this.password === this.passwordStored) {
      this.error = '';
      this.cookieService.set('UserIn', 'true');

      this.routes.navigate(['/home']);
    }
    if (this.password !== this.passwordStored) {
      this.error = 'Contraseña incorrecta';
      this.toastr.error('Contraseña incorrecta', 'Error');
    }
  }
}
