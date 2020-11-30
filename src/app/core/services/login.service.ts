import { User } from './../../shared/models/User';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post(`${URL}/login`, user);
  }
}
