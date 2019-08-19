import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Token } from '../interfaces/token';
import { Register } from '../interfaces/register';
import { APIUrl } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line:variable-name
  private _token: BehaviorSubject<Token> = new BehaviorSubject<Token>(null);
  public token$ = this._token.asObservable();
  private api = APIUrl;

  constructor(private http: HttpClient) { }

  Register(regData: Register): Observable<any> {
    const url = `${this.api}/api/Account/Register`;
    return this.http.post(url, regData);
  }

  Login(user: string, pass: string): Observable<Token> {
    this.CheckToken();
    if (this._token.getValue()) {
      return this.token$;
    } else {
      const url = `${this.api}/token`;
      const params = new HttpParams({
        fromObject: {
          username: user,
          password: pass,
          grant_type: 'password'
        }
      });
      return this.http.post<Token>(url, params);
    }
  }

  GetToken(): Token {
    return this._token.getValue();
  }

  CheckToken(): void {
    const token: Token = JSON.parse(localStorage.getItem('auth')) || undefined;
    if (token) {
      // console.log(token);
      if (Date.now() < Date.parse(token['.expires'])) {
        this.SetToken(token);
      } else {
        this.RemoveToken();
      }
    }
  }

  SetToken(token: Token): void {
    this._token.next(token);
    localStorage.setItem('auth', JSON.stringify(token));
  }

  RemoveToken(): void {
    this._token.next(null);
    localStorage.removeItem('auth');
  }

  Logout(): Observable<any> {
    const url = `${this.api}/api/Account/Logout`;
    return this.http.post(url, {});
  }
}
