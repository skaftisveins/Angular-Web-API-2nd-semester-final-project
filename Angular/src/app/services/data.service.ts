import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Herocard } from '../interfaces/herocard';
import { APIUrl, IMGURUrl } from '../config';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // tslint:disable-next-line:variable-name
  private _herocardURL = `${APIUrl}/api/herocard/`;
  // tslint:disable-next-line:variable-name
  private _herocardImgURL = IMGURUrl;

  constructor(private http: HttpClient) { }

  getHerocards(): Observable<Herocard[]> {
    return this.http.get<Herocard[]>(`${this._herocardURL}all`);
  }

  getHerocard(id: number): Observable<Herocard> {
    return this.http.get<Herocard>(`${this._herocardURL}${id}`);
  }

  getUserDecks(): Observable<Herocard[]> {
    return this.http.get<Herocard[]>(`${this._herocardURL}deck/all`);
  }

  getPlayableUserDecks(): Observable<Herocard[]> {
    return this.http.get<Herocard[]>(`${this._herocardURL}deck/playable`);
  }

  buyHerocard(card: Herocard): Observable<Herocard> {
    return this.http.post<Herocard>(`${this._herocardURL}buy`, card);
  }

  sellHerocard(card: Herocard): Observable<Herocard> {
    return this.http.put<Herocard>(`${this._herocardURL}sell`, card);
  }

  setHerocardPlayable(card: Herocard): Observable<Herocard> {
    return this.http.put<Herocard>(`${this._herocardURL}deck/set/playable`, card);
  }

}
