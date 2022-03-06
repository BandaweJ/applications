import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from '../shared/applications-service.service';
import { GetApplication } from '../models/get-application';
import { Observable, throwError } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { LoadingSpinnerService } from '../shared/loading-spinner/loading-spinner.service';
import { catchError, finalize } from 'rxjs/operators';
import { MessagesService } from '../messages/messages.service';
import { ApplicationsStore } from './applications.store';

@Component({
  selector: 'app-manage-applications',
  templateUrl: './manage-applications.component.html',
  styleUrls: ['./manage-applications.component.css'],
})
export class ManageApplicationsComponent implements OnInit {
  applications$!: Observable<GetApplication[]>;
  chosenApplication!: GetApplication;
  selected: boolean = false;
  status!: string;

  constructor(
    private applicationsStore: ApplicationsStore,
    private applicationsService: ApplicationsService
  ) {}

  ngOnInit(): void {
    //this.applications$ = this.applicationsService
    //.getApplicationsByStatus('P');
    this.status = 'P';
    this.reloadApplications(this.status);
  }

  reloadApplications(status: string) {
    this.applications$ = this.applicationsStore.filterByStatus(status);
  }

  choseApplication(app: GetApplication) {
    this.chosenApplication = app;
    this.selected = true;
  }

  changeApplicationsOption(status: string) {
    this.reloadApplications(status);
    this.status = status;
  }

  changeApplicationStatus(stats: string) {
    if (this.chosenApplication.status === stats) {
      return;
    } else {
      this.chosenApplication.status = stats;
      this.applicationsStore
        .changeApplicationStatus(this.chosenApplication.id, stats)
        .subscribe();

      // this.applicationsService
      //   .changeApplicationStatus(this.chosenApplication.id, stats)
      //   .subscribe((next) => {
      //     this.reloadApplications(this.status);
      //     this.chosenApplication.status = stats;
      //   });
      //console.log(this.status);

      //this.reloadApplications(this.status);
    }
  }
}
