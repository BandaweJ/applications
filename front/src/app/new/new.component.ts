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

  schools!: GetSchool[];
  selectedSchools: GetSchool[] = [];
  chosenSubjs: string[] = [];

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

  onSubmit(){
    console.log('Info: ');
    console.log(this.appForm.value);
    console.log('Choices: ');
    console.log(this.selectedSchools);
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
    this.chosenSubjs.push(subject);
  }

}
