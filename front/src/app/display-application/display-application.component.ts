import { Component, Input, OnInit } from '@angular/core';
import { GetApplication } from '../models/get-application';

@Component({
  selector: 'app-display-application',
  templateUrl: './display-application.component.html',
  styleUrls: ['./display-application.component.css'],
})
export class DisplayApplicationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  fetchedApplication!: any;
}
