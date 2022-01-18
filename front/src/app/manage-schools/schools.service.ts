import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetSchool } from '../models/get-school';
import { CreateSchool } from '../models/create-school';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  baseURL: string = 'localhost:3000/schools';

  constructor(private httpClient: HttpClient) {
   }

   getSchools(): Observable<GetSchool[]>{
     return this.httpClient.get<GetSchool[]>(this.baseURL);
   }

   createSchool(school: CreateSchool): Observable<GetSchool>{
     return this.httpClient.post<GetSchool>(this.baseURL, school);
   }
}
