import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApijsonService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  apiURL = 'https://nancyb3a.github.io/Test/usuarios_PGY4121_01.json'

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<any> {
    return this.http.get(this.apiURL).pipe(
      retry(3)
    );
  }



}

