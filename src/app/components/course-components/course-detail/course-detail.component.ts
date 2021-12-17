import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  //styleUrls: ['./course-detail.component.css']
})

export class CourseDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetCourse(this.getId).subscribe(res => {
      this.updateForm.setValue({
        address: res['address'],
        city: res['city'],
        state: res['state'],
        zip: res['zip'],
        resident_count: res['resident_count'],
        course_year: res['course_year'],
        assessor: res['assessor']
      });
    });

    this.updateForm = this.formBuilder.group({
      address: [''],
      city: [''],
      state: [''],
      zip: [''],
      resident_count: [''],
      course_year: [''],
      assessor: ['']
    });
   }

  ngOnInit() { }

  onUpdate(): any {
    this.crudService.updateCourse(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('course-list'))
      }, (err) => {
        console.log(err);
      });
  }

}
