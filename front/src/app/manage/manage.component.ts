import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
})
export class ManageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  user$!: Observable<User>;

  ngOnInit(): void {
    this.user$ = this.authService.user;
  }
}
