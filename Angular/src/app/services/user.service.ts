import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIUrl } from '../config';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = APIUrl;

  constructor(private http: HttpClient) { }

  UserInfo(): Observable<User> {
    const url = `${this.api}/api/Account/UserInfo`;
    return this.http.get<User>(url);
  }
}
