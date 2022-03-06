import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateApplication } from '../models/create-application';
import { Observable } from 'rxjs';
import { GetApplication } from '../models/get-application';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  baseURL: string = 'http://localhost:3000/applications';

  constructor(private httpClient: HttpClient) {}

  createApplication(createApplication: CreateApplication) {
    return this.httpClient
      .post(this.baseURL, createApplication)
      .pipe(shareReplay());
  }

  getApplicationsByStatus(status: string): Observable<GetApplication[]> {
    return this.httpClient.get<GetApplication[]>(
      this.baseURL + '/manage/' + status
    );
  }

  changeApplicationStatus(id: string, status: string): Observable<any> {
    return this.httpClient.patch<any>(this.baseURL + '/manage/' + id, {
      status: status,
    });
  }
}
