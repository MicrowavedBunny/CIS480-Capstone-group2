import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-remove-course',
  templateUrl: './remove-course.component.html',
  //styleUrls: ['./remove-course.component.css']
})
export class RemoveCourseComponent implements OnInit {

  getId: any;
  deleteForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.deleteForm = this.formBuilder.group({
      id: [''],
      name: [''],
      code: [''],
      description: [''],
      credits: [''],
      type: [''],
      cap: ['']
    });

    this.crudService.GetCourse(this.getId).subscribe(res => {
      this.deleteForm.setValue({
        id: res['_id'],
        name: res['name'],
        code: res['code'],
        description: res['description'],
        credits: res['credits'],
        type: res['type'],
        cap: res['cap']
      });
    });

    this.crudService.RemoveCourse(this.getId)
   }

  ngOnInit(): void { }

  onDelete(): any {
    //call the method to actually remove the course
    this.crudService.RemoveCourse(this.getId)
      .subscribe(() =>{
        //send the user back to the list of course
        this.ngZone.run(() => this.router.navigateByUrl('course-list'))
      }, (err) => {
        console.log(err)
      })
  }
}
