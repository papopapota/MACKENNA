import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTK0EvhaHRy08R11H6XCEBPUUePTvljv0-UQamxVpInIookZruDOLHJ7zeLiH7I2wfZjT4VrJsXK8Lw/pub?output=csv';
  constructor(private http : HttpClient) { }

  getLibros():Observable<any>{
    //console.log(this.http.get(this.url , {responseType: 'text'}));

    return this.http.get(this.url , {responseType: 'text'});
  }

 
}
