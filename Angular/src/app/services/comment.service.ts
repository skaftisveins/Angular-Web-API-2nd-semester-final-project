import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIUrl } from '../config';
import { Comment } from '../interfaces/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  // tslint:disable-next-line:variable-name
  private _commentURL = `${APIUrl}/api/herocard/comment/`;

  constructor(private http: HttpClient) { }

  getComments(card: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this._commentURL}all/${card}`);
  }

  getFlaggedComments(card: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this._commentURL}all/${card}/flagged`);
  }

  postComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this._commentURL}create`, comment);
  }

  editComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this._commentURL}update`, comment);
  }

  removeComment(id: number): Observable<Comment> {
    return this.http.delete<Comment>(`${this._commentURL}delete/${id}`);
  }

  flagComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this._commentURL}flag`, comment);
  }

}
