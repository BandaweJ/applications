import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SchoolsService } from '../manage-schools/schools.service';
import { GetSchool } from '../models/get-school';
import { AuthService } from '../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  //styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private schoolsService: SchoolsService,
    private authService: AuthService,
    private router: Router
  ) {}

  authForm!: FormGroup;
  schools!: GetSchool[];
  isLoggedInMode: boolean = true;
  errorMsg!: string;
  loading: boolean = false;

  ngOnInit(): void {
    this.schoolsService.getSchools().subscribe((results) => {
      this.schools = results;
    });
    this.authForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern(
          /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
        ),
      ]),
      confirm: new FormControl(null),
      school: new FormControl(null, Validators.required),
    });
  }

  disableLoginButton() {
    if (this.isLoggedInMode) {
      return this.username?.errors || this.password?.errors;
    }
    return (
      this.username?.errors || this.password?.errors || this.school?.errors
    );
  }

  switchLogInMode() {
    this.isLoggedInMode = !this.isLoggedInMode;
  }

  passwordsMatch(): boolean {
    return this.confirm === this.password;
  }

  get username() {
    return this.authForm.get('username');
  }

  get password() {
    return this.authForm.get('password');
  }

  get confirm() {
    return this.authForm.get('confirm');
  }

  get school() {
    return this.authForm.get('school');
  }

  onSubmit() {
    if (this.isLoggedInMode) {
      this.loading = true;
      const { username, password } = this.authForm.value;
      this.authService.signIn({ username, password }).subscribe(
        (result) => {
          //console.log(result);

          this.loading = false;
          this.router.navigateByUrl('/manage');
        },
        (errorResp) => {
          console.log(errorResp.error.message);
          this.errorMsg = errorResp.error.message;
          this.loading = false;
        }
      );
    } else {
      const school = this.schools.find((sch) => sch.id === this.school?.value);
      const { username, password } = this.authForm.value;
      this.authService.signUp({ username, password, school }).subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          this.errorMsg = error;
        }
      );
    }

    //console.log('Username ' + username + ' password ' + password);
    //console.log(school);
  }
}
