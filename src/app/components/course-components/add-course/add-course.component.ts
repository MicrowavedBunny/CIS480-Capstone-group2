import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent implements OnInit {

  courseForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.courseForm = this.formBuilder.group({
      name: [''],
      code: [''],
      description: [''],
      credits: [''],
      type: [''],
      cap: [''],
      owner: ['test']  //this cant be '' or it will clear the form value (if it is set in the hidden form inside html) this is where we need to pass in the user id from the other collection
    })
   }

  ngOnInit(): void {  }

  onSubmit(): any {
    this.crudService.AddCourse(this.courseForm.value)
      .subscribe(() => {
        console.log('Data added successfully')
        this.ngZone.run(() => this.router.navigateByUrl('/course-list'))
      }, (err) => {
        console.log(err);
      });
  }

}