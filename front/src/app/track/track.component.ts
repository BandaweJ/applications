import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrackService } from './track.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css'],
})
export class TrackComponent implements OnInit {
  constructor(private trackService: TrackService) {}

  trackForm!: FormGroup;

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
      (result) => {
        {
          console.log(result);
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    );
  }
}
