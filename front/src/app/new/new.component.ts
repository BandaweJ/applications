import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { SchoolsService } from '../manage-schools/schools.service';
import { GetSchool } from '../models/get-school';
import { CreateApplication } from '../models/create-application';
import { ApplicationsService } from '../shared/applications-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnInit {
  constructor(
    private schoolsService: SchoolsService,
    private applicationsService: ApplicationsService
  ) {}

  //schools!: GetSchool[]; //list of registered school
  schools$!: Observable<GetSchool[]>;
  //currentSchool!: GetSchool;

  selectedSchools: GetSchool[] = []; //schools applied to
  chosenSubjs: string[] = []; //subject chosen for A level combinations

  appForm!: FormGroup;

  genders: string[] = ['Male', 'Female', 'Other'];
  titles: string[] = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof'];
  levels: string[] = ['1', '2', '3', '4', '5', '6'];
  names: string[] = [
    'Maths',
    'Physics',
    'Biology',
    'Chemistry',
    'Technical Drawing',
    'Accounts',
    'Economics',
    'Business Studies',
    'Commerce',
    'Shona',
    'English Language',
    'English Literature',
    'Bible Knowledge',
    'History',
  ];
  grades: string[] = ['A', 'B', 'C', 'D', 'E'];

  ngOnInit(): void {
    // this.schoolsService.getSchools().subscribe((schools) => {
    //   this.schools = schools;
    // });
    this.schools$ = this.schoolsService.getSchools();

    this.appForm = new FormGroup({
      personalDetails: new FormGroup({
        firstname: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
        lastname: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
        idnumber: new FormControl(null, [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(15),
          Validators.pattern(/^\d{2}-\d{6,7}-[A-Z]-\d{2}$/),
          //Validators.pattern('^d{2}-d+-[A-Z]-d{2}$'),
        ]),
        sex: new FormControl(null, Validators.required),
        dob: new FormControl(null, Validators.required),
      }),
      parentDetails: new FormGroup({
        title: new FormControl(null, Validators.required),
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ]),
      }),
      contactDetails: new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        cell: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\d+\d$/),
        ]) /**TODO write regex to validate cell number*/,
        address: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
        ]),
      }),
      academicDetails: new FormGroup({
        prevschool: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
        ]),
        level: new FormControl(null, Validators.required),
        subjects: new FormArray([]),
      }),
    });
  }

  get dob() {
    return this.appForm.get('personalDetails.dob');
  }

  get sex() {
    return this.appForm.get('personalDetails.sex');
  }

  get idnumber() {
    return this.appForm.get('personalDetails.idnumber');
  }

  get lastname() {
    return this.appForm.get('personalDetails.lastname');
  }

  get firstname() {
    return this.appForm.get('personalDetails.firstname');
  }

  get pname() {
    return this.appForm.get('parentDetails.name');
  }

  get ptitle() {
    return this.appForm.get('parentDetails.title');
  }

  get email() {
    return this.appForm.get('contactDetails.email');
  }

  get cell() {
    return this.appForm.get('contactDetails.cell');
  }

  get address() {
    return this.appForm.get('contactDetails.address');
  }

  get prevschool() {
    return this.appForm.get('academicDetails.prevschool');
  }

  get subjects() {
    return this.appForm.get('academicDetails.subjects') as FormArray;
  }

  get level() {
    return this.appForm.get('academicDetails.level') as FormControl;
  }

  onSelectSchool(school: GetSchool) {
    if (!this.selectedSchools.includes(school)) {
      this.selectedSchools.push(school);
    }
  }

  deleteSchool(school: GetSchool) {
    this.selectedSchools = this.selectedSchools.filter((sch) => {
      if (sch === school) {
        return false;
      } else {
        return true;
      }
    });
  }

  addSubjects() {
    const group = new FormGroup({
      name: new FormControl(null),
      grade: new FormControl(null),
    });
    this.subjects.push(group);
  }

  removeSubject(index: number) {
    this.subjects.removeAt(index);
  }

  chooseSubject(subject: string) {
    if (this.chosenSubjs.length <= 4 || !this.chosenSubjs.includes(subject)) {
      this.chosenSubjs.push(subject);
    }
  }

  remove(subject: string) {
    const index = this.chosenSubjs.indexOf(subject);

    this.chosenSubjs.splice(index, 1);
  }

  onSubmit() {
    let app: CreateApplication = {
      ...this.appForm.value,
      selectedSchools: this.selectedSchools,
      aLevelCombination: this.chosenSubjs,
    };

    this.applicationsService
      .createApplication(app)
      .subscribe((result: any) => console.log(result));
  }
}
