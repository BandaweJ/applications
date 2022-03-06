import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { GetApplication } from '../models/get-application';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private baseURL: string = 'http://localhost:3000/track';
  constructor(private httpClient: HttpClient) {}

  trackApplication(id: string): Observable<GetApplication> {
    return this.httpClient.get<GetApplication>(this.baseURL + `/${id}`);
  }
}
