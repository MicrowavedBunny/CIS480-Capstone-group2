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
        name: res['name'],
        code: res['code'],
        description: res['description'],
        credits: res['credits'],
        type: res['type'],
        cap: res['cap'],
        owner: res['owner']
      });
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      code: [''],
      description: [''],
      credits: [''],
      type: [''],
      cap: [''],
      owner: ['']
    });
   }

  ngOnInit() { 

    console.log(this.getId);

  }

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
