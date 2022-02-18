import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthCredentials } from '../models/auth-credentials';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  baseURL: string = 'http://localhost:3000/auth/';

  signInMode: boolean = true;

  signUp(authCredentials: AuthCredentials): Observable<AuthCredentials> {
    return this.httpClient.post<AuthCredentials>(
      this.baseURL + 'signup',
      authCredentials
    );
  }

  signIn(authCredentials: AuthCredentials): Observable<any> {
    return this.httpClient.post<any>(this.baseURL + 'signin', authCredentials);
  }
}
