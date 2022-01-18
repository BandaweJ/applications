import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SchoolsService } from './schools.service';

@Component({
  selector: 'app-manage-schools',
  templateUrl: './manage-schools.component.html',
  styleUrls: ['./manage-schools.component.css']
})
export class ManageSchoolsComponent implements OnInit {

  constructor(private schoolsService: SchoolsService) { }

  ngOnInit(): void {
    this.registerSchool = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      cell: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
    })
  }

  registerSchool!: FormGroup;

  onSubmit(){
    this.schoolsService.createSchool(this.registerSchool.value)
    .subscribe(school =>{
      console.log(school)
    });

  }

}
