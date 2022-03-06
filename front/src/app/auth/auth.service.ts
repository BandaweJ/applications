import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthCredentials } from '../models/auth-credentials';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import * as moment from 'moment';
import jwt_decode from 'jwt-decode';

import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  baseURL: string = 'http://localhost:3000/auth/';

  signInMode: boolean = true;
  user!: Observable<any>;

  private loggedInSource = new BehaviorSubject(this.isLoggedIn());
  loggedIn = this.loggedInSource.asObservable();

  signUp(authCredentials: AuthCredentials): Observable<AuthCredentials> {
    return this.httpClient
      .post<AuthCredentials>(this.baseURL + 'signup', authCredentials)
      .pipe(shareReplay());
  }

  signIn(authCredentials: AuthCredentials): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(this.baseURL + 'signin', authCredentials)
      .pipe(
        tap((res) => {
          //res.expiresIn = 3600;
          this.setSession(res);
        }),
        shareReplay()
      );
  }

  private setSession(authResult: AuthResponse) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    this.user = of(this.getDecodedAccessToken(authResult.accessToken));
    this.loggedInSource.next(true);
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.loggedInSource.next(false);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }

    return null;
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
