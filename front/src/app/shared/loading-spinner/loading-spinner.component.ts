import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from './loading-spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent implements OnInit {
  constructor(public loadingService: LoadingSpinnerService) {}

  ngOnInit(): void {}
}
