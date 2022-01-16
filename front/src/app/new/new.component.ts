import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  appForm!: FormGroup;
  genders: string[] = ['Male', 'Female', 'Other'];
  titles: string[] = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof'];
  levels: string[] = ['1', '2', '3', '4', '5', '6'];
  names: string[] = ['Maths', 'Physics', 'Biology', 'Chemistry', 'Technical Drawing', 'Accounts', 'Economics', 'Business Studies'];
  grades: string[] = ['A', 'B', 'C', 'D', 'E',];

  constructor() { }

  ngOnInit(): void {
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
    console.log(this.appForm.value);
  }

  get subjects(){
    return this.appForm.get('academicDetails.subjects') as FormArray;
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

}
