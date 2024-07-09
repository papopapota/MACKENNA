import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private cookieService: CookieService,
    private routes: Router
  ){
  }
  ngOnInit(){
    const userSession = this.cookieService.get('UserIn');

    if(userSession  == 'false' || userSession == ''){
      this.cookieService.set('UserIn', 'false');
      this.routes.navigate(['/login']);
    }
  }

  public logout(){
    //this.cookieService.set('UserIn', 'false');
    this.cookieService.delete('UserIn');
    this.routes.navigate(['/login']);
  }

}
