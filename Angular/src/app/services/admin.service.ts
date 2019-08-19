import { Injectable } from '@angular/core';
import { APIUrl } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Herocard } from '../interfaces/herocard';
import { Comment } from '../interfaces/comment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // tslint:disable-next-line:variable-name
  private _adminURL = `${APIUrl}/api/admin/`;
  // tslint:disable-next-line:variable-name
  private _commentURL = `${APIUrl}/api/herocard/comment/`;

  constructor(private http: HttpClient) { }

  getHerocards(): Observable<Herocard[]> {
    return this.http.get<Herocard[]>(`${this._adminURL}herocard/all`);
  }

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this._adminURL}comment/all`);
  }

  getAllFlaggedComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this._adminURL}comment/all/flagged`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this._adminURL}user/all`);
  }

  createHerocard(card: Herocard): Observable<Herocard> {
    return this.http.post<Herocard>(`${this._adminURL}herocard/create`, card);
  }

  putHerocard(card: Herocard): Observable<Herocard> {
    return this.http.put<Herocard>(`${this._adminURL}herocard/update`, card);
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this._adminURL}comment/update`, comment);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this._adminURL}user/update`, user);
  }

  deleteHerocard(id: number): Observable<Herocard> {
    return this.http.delete<Herocard>(`${this._adminURL}herocard/delete/${id}`);
  }

  deleteComment(id: number): Observable<Comment> {
    return this.http.delete<Comment>(`${this._adminURL}herocard/comment/delete/${id}`);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this._adminURL}user/delete/${id}`);
  }
}
