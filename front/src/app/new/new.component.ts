import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { SchoolsService } from '../manage-schools/schools.service';
import { GetSchool } from '../models/get-school';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  schools!: GetSchool[];//list of registered school
  currentSchool!: GetSchool;

  selectedSchools: GetSchool[] = [];//schools applied to
  chosenSubjs: string[] = [];//subject chosen for A level combinations

  appForm!: FormGroup;

  genders: string[] = ['Male', 'Female', 'Other'];
  titles: string[] = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof'];
  levels: string[] = ['1', '2', '3', '4', '5', '6'];
  names: string[] = ['Maths', 'Physics', 'Biology', 'Chemistry', 'Technical Drawing', 'Accounts', 'Economics', 'Business Studies', 'Commerce', 'Shona', 'English Language', 'English Literature', 'Bible Knowledge', 'History'];
  grades: string[] = ['A', 'B', 'C', 'D', 'E',];

  constructor(private schoolsService: SchoolsService) { }

  ngOnInit(): void {

    this.schoolsService.getSchools().subscribe(schools => {
      this.schools = schools;
    })

    this.appForm = new FormGroup({
      personalDetails: new FormGroup({
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        idnumber: new FormControl(null, Validators.required),
        sex: new FormControl(null, Validators.required),
        dob: new FormControl(null, Validators.required),
      }),
      parentDetails: new FormGroup({
        title: new FormControl(null, Validators.required),
        name: new FormControl(null, Validators.required),
      }),
      contactDetails: new FormGroup({
        email: new FormControl(null, [Validators.email, Validators.required]),
        cell: new FormControl(null, Validators.required),/**TODO write regex to validate cell number*/
        address: new FormControl(null, Validators.required),
      }),
      academicDetails: new FormGroup({
        prevschool: new FormControl(null, Validators.required),
        level: new FormControl(null, Validators.required),
        subjects: new FormArray([]),
      })
    })
  }

  get dob(){
    return this.appForm.get('personalDetails.dob');
  }

  get sex(){
    return this.appForm.get('personalDetails.sex');
  }

  get idnumber(){
    return this.appForm.get('personalDetails.idnumber');
  }

  get lastname(){
    return this.appForm.get('personalDetails.lastname');
  }

  get firstname(){
    return this.appForm.get('personalDetails.firstname');
  }

  get pname(){
    return this.appForm.get('parentDetails.name');
  }

  get ptitle(){
    return this.appForm.get('parentDetails.title')
  }

  get email(){
    return this.appForm.get("contactDetails.email");
  }

  get prevschool(){
    return this.appForm.get('academicDetails.prevschool');
  }

  get subjects(){
    return this.appForm.get('academicDetails.subjects') as FormArray;
  }

  get level(){
    return this.appForm.get('academicDetails.level') as FormControl;
  }

  onSelectSchool(school: GetSchool){
    if(!this.selectedSchools.includes(school)){
      this.selectedSchools.push(school);
    }
  }

  deleteSchool(school: GetSchool){
    this.selectedSchools = this.selectedSchools.filter(sch => {
      if(sch === school){
        return false;
      }
      else{
        return true;
      }
    })
  }

  addSubjects(){
    const group = new FormGroup({
      name: new FormControl(null),
      grade: new FormControl(null),
    })
    this.subjects.push(group);
  }

  removeSubject(index: number){
    this.subjects.removeAt(index);
  }

  chooseSubject(subject: string){
    if(this.chosenSubjs.length <= 4 || !this.chosenSubjs.includes(subject)){
      this.chosenSubjs.push(subject);
    }

  }

  remove(subject: string){
    const index = this.chosenSubjs.indexOf(subject);

    this.chosenSubjs.splice(index, 1);

  }

  onSubmit(){
    console.log('Form: ');
    console.log(this.appForm.value);
    console.log('Selected Schools: ');
    console.log(this.selectedSchools);
    console.log('Subject Combination: ');
    console.log(this.chosenSubjs);
  }


}
