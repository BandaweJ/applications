import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SchoolsService } from '../manage-schools/schools.service';
import { GetSchool } from '../models/get-school';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private schoolsService: SchoolsService,
    private authService: AuthService
  ) {}

  signupForm!: FormGroup;
  schools!: GetSchool[];

  ngOnInit(): void {
    this.schoolsService.getSchools().subscribe((results) => {
      this.schools = results;
    });
    this.signupForm = new FormGroup({
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

  passwordsMatch(): boolean {
    return this.confirm === this.password;
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirm() {
    return this.signupForm.get('confirm');
  }

  get school() {
    return this.signupForm.get('school');
  }

  onSubmit() {
    const school = this.schools.find((sch) => sch.id === this.school?.value);
    const { username, password } = this.signupForm.value;
    //console.log('Username ' + username + ' password ' + password);
    //console.log(school);
    this.authService
      .signUp({ username, password, school })
      .subscribe((result) => {
        console.log(result);
      });
  }
}
