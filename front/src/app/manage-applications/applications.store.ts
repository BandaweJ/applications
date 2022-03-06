import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { GetApplication } from '../models/get-application';
import { filter, map, catchError, tap, finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoadingSpinnerService } from '../shared/loading-spinner/loading-spinner.service';
import { MessagesService } from '../messages/messages.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsStore {
  private baseURL: string = 'http://localhost:3000/applications';

  private subject = new BehaviorSubject<GetApplication[]>([]);

  applications$: Observable<GetApplication[]> = this.subject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private loadingSpinner: LoadingSpinnerService,
    private messagesService: MessagesService
  ) {
    console.log('called loadAllApplications');
    this.loadAllApplications();
  }

  changeApplicationStatus(
    applicationId: string,
    status: string
  ): Observable<any> {
    const applications = this.subject.getValue();

    const index = applications.findIndex((app) => app.id === applicationId);

    const newApplication: GetApplication = {
      ...applications[index],
      ...{ status: status },
    };

    const newApplications = applications.slice(0);

    newApplications[index] = newApplication;

    this.subject.next(newApplications);

    return this.httpClient.patch<any>(
      this.baseURL + '/manage/' + applicationId,
      {
        status: status,
      }
    );
  }

  filterByStatus(status: string): Observable<GetApplication[]> {
    return this.applications$.pipe(
      map((applications) => applications.filter((app) => app.status === status))
    );
  }

  private loadAllApplications() {
    console.log('stated loading');
    this.loadingSpinner.loadingOn();
    console.log('switched loading on');
    this.httpClient
      .get<GetApplication[]>(this.baseURL)
      .pipe(
        catchError((err) => {
          const message = 'Could not load Applications';
          this.messagesService.showErrors(message);
          console.log('This is the error', message, err);
          return throwError(err);
        }),
        tap((applications) => {
          console.log('in the tap operator');
          this.subject.next(applications);
          //this.loadingSpinner.loadingOff();
        }),
        finalize(() => this.loadingSpinner.loadingOff())
      )
      .subscribe();
  }
}
