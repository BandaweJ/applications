import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetApplication } from '../models/get-application';
import { TrackService } from './track.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
})
export class TrackComponent implements OnInit {
  constructor(private trackService: TrackService) {}

  trackForm!: FormGroup;

  fetchedApplication!: GetApplication;

  msg: string = '';
  found: boolean = false;

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
    console.log('Submitted: ');
    console.log(this.trackForm.value);
    this.trackService.trackApplication(this.trackid!.value).subscribe(
      (result: GetApplication) => {
        this.found = true;
        this.fetchedApplication = result;
        console.log(this.fetchedApplication);
      },
      (error: HttpErrorResponse) => {
        this.found = false;
        this.msg = error.error.message;
      }
    );
  }
}
