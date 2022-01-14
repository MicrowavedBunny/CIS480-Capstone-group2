import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../../service/crud.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

interface Course {
  name: string;
  code: string;
  description: string;
  credits: number;
  type: string;
  cap: number;
}

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})

export class CourseDetailComponent implements OnInit {
  selectedCourse = new FormControl('');
  courses: Course[] = [
    {
      name: "Intro to Programming",
      code: "CIS 101",
      description: "First steps to learning how to create logic for basic programs",
      credits: 3,
      type: "Computer Science",
      cap: 20
    },
    {
      name: "College Algerbra",
      code: "MTH 101",
      description: "College Algerbra",
      credits: 3,
      type: "Math",
      cap: 20
    },
    {
      name: "College English",
      code: "ENG 101",
      description: "College English",
      credits: 3,
      type: "English",
      cap: 20,
    },
    {
      name: "Biology I",
      code: "SCI 108",
      description: "Biology",
      credits: 3,
      type: "Science",
      cap: 20,
    },
    {
      name: "Intro to Psychology",
      code: " PSYCH 111",
      description: "Introduction to psychology learning basic priciples of the human mind",
      credits: 3,
      type: "Social Science",
      cap: 20,
    }, {
      name: "Intro to Sociology",
      code: " SOC 101",
      description: "Introduction to sociology focusing on society and human behavior",
      credits: 3,
      type: "Social Science",
      cap: 20,
    }, {
      name: "Business Math",
      code: " MTH 105",
      description: "Mathmatics that are used to balance workbooks and other business accounts",
      credits: 3,
      type: "Math",
      cap: 20,
    }, {
      name: "JavaScript Applications",
      code: " CIS 158",
      description: "Introducing JavaScript and the many ways you can use it for webpages and web applications",
      credits: 3,
      type: "Computer Science",
      cap: 20
    }, {
      name: "Mobile App Development",
      code: " CIS 327",
      description: "Introducing Mobile development through Android Studio",
      credits: 3,
      type: "Computer Science",
      cap: 20
    }, {
      name: "ServerSide Scripting with PHP",
      code: " CIS 349",
      description: "Introduction to PHP with a MySQL database to store, edit and delete your data",
      credits: 3,
      type: "Computer Science",
      cap: 20
    }
  ];

  //forms
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
        owner: [localStorage.getItem("studentId")]  //this cant be '' or it will clear the form value (if it is set in the hidden form inside html) this is where we need to pass in the user id from the other collection
      });
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      code: [''],
      description: [''],
      credits: [''],
      type: [''],
      cap: [''],
      owner: [localStorage.getItem("studentId")]  //this cant be '' or it will clear the form value (if it is set in the hidden form inside html) this is where we need to pass in the user id from the other collection
    });
   }

  ngOnInit() { 

    console.log(this.getId);

  }

  onUpdate(): any {
    if(this.selectedCourse.value == ''){
      alert("Please select an option");
    } else {
    this.updateForm.controls['name'].setValue((<HTMLInputElement>document.getElementById('select1')).textContent);
    this.updateForm.controls['credits'].setValue((<HTMLInputElement>document.getElementById('credits1')).textContent);
    this.updateForm.controls['code'].setValue((<HTMLInputElement>document.getElementById('code1')).textContent);
    this.updateForm.controls['description'].setValue((<HTMLInputElement>document.getElementById('description1')).textContent);
    this.updateForm.controls['type'].setValue((<HTMLInputElement>document.getElementById('type1')).textContent);
    this.updateForm.controls['cap'].setValue((<HTMLInputElement>document.getElementById('cap1')).textContent);

    this.crudService.updateCourse(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('course-list'))
      }, (err) => {
        console.log(err);
      });
  }
  }
}
