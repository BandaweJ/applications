import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn!: boolean;

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((res) => (this.isLoggedIn = res));
  }

  signout() {
    this.authService.logout();
    // this.isLoggedIn = false;
    console.log(this.isLoggedIn);
    this.router.navigateByUrl('/new');
  }
}
