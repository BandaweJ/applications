import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetApplication } from '../models/get-application';
import { TrackService } from './track.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
})
export class TrackComponent implements OnInit {
  constructor(public trackService: TrackService) {}

  trackForm!: FormGroup;

  fetchedApplication$!: Observable<GetApplication>;

  ngOnInit(): void {
    this.trackForm = new FormGroup({
      trackid: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]{1}\d{8}$/),
      ]),
    });
  }

  get trackid() {
    return this.trackForm.get('trackid');
  }

  onSubmit() {
    this.fetchedApplication$ = this.trackService.trackApplication(
      this.trackid!.value
    );
  }
}
