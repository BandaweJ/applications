import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService) {}

  signinForm!: FormGroup;

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const { username, password } = this.signinForm.value;
    this.authService.signIn({ username, password }).subscribe((result) => {
      console.log(result);
    });
    console.log(username + ' ' + password);
  }
}
