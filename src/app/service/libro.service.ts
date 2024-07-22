import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTibFSl9KU92Z3sJLq9Jru7xl3XHxTdpNtkJy6JuBEzPJj-SxyGa4u-EqzZ06Z9cn6q9kUQ7n3G8Lnf/pub?output=csv';
  constructor(private http : HttpClient) { }

  getLibros():Observable<any>{
    //console.log(this.http.get(this.url , {responseType: 'text'}));

    return this.http.get(this.url , {responseType: 'text'});
  }

 
}
