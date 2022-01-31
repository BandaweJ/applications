import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateApplication } from '../models/create-application';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsServiceService {
  baseURL: string = 'http://localhost:3000/applications';

  constructor(private httpClient: HttpClient) {}

  createApplication(createApplication: CreateApplication) {
    return this.httpClient.post(this.baseURL, createApplication);
  }
}
