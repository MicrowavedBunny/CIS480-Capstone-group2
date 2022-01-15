import { Component, OnInit, NgZone, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
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
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})


export class AddCourseComponent implements OnInit {
  //Grabbing data for the Html
  selectedCourse = new FormControl('');
  selectedCourse2 = new FormControl('');
  selectedCourse3 = new FormControl('');
  
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
  courseForm: FormGroup;
  courseForm2: FormGroup;
  courseForm3: FormGroup;

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
      owner: [localStorage.getItem("studentId")]  //this cant be '' or it will clear the form value (if it is set in the hidden form inside html) this is where we need to pass in the user id from the other collection
    })
    this.courseForm2 = this.formBuilder.group({
      name: [''],
      code: [''],
      description: [''],
      credits: [''],
      type: [''],
      cap: [''],
      owner: [localStorage.getItem("studentId")]  //this cant be '' or it will clear the form value (if it is set in the hidden form inside html) this is where we need to pass in the user id from the other collection
    })
    this.courseForm3 = this.formBuilder.group({
      name: [''],
      code: [''],
      description: [''],
      credits: [''],
      type: [''],
      cap: [''],
      owner: [localStorage.getItem("studentId")]  //this cant be '' or it will clear the form value (if it is set in the hidden form inside html) this is where we need to pass in the user id from the other collection
    })
  }
  

  ngOnInit(): void {
  }

  onSubmit(): any {
    

    //set data for form 1
    this.courseForm.controls['name'].setValue((<HTMLInputElement>document.getElementById('select1')).textContent);
    this.courseForm.controls['credits'].setValue((<HTMLInputElement>document.getElementById('credits1')).textContent);
    this.courseForm.controls['code'].setValue((<HTMLInputElement>document.getElementById('code1')).textContent);
    this.courseForm.controls['description'].setValue((<HTMLInputElement>document.getElementById('description1')).textContent);
    this.courseForm.controls['type'].setValue((<HTMLInputElement>document.getElementById('type1')).textContent);
    this.courseForm.controls['cap'].setValue((<HTMLInputElement>document.getElementById('cap1')).textContent);

    //set data for form 2
    this.courseForm2.controls['name'].setValue((<HTMLInputElement>document.getElementById('select2')).textContent);
    this.courseForm2.controls['credits'].setValue((<HTMLInputElement>document.getElementById('credits2')).textContent);
    this.courseForm2.controls['code'].setValue((<HTMLInputElement>document.getElementById('code2')).textContent);
    this.courseForm2.controls['description'].setValue((<HTMLInputElement>document.getElementById('description2')).textContent);
    this.courseForm2.controls['type'].setValue((<HTMLInputElement>document.getElementById('type2')).textContent);
    this.courseForm2.controls['cap'].setValue((<HTMLInputElement>document.getElementById('cap2')).textContent);
    //set data for form 3
    this.courseForm3.controls['name'].setValue((<HTMLInputElement>document.getElementById('select3')).textContent);
    this.courseForm3.controls['credits'].setValue((<HTMLInputElement>document.getElementById('credits3')).textContent);
    this.courseForm3.controls['code'].setValue((<HTMLInputElement>document.getElementById('code3')).textContent);
    this.courseForm3.controls['description'].setValue((<HTMLInputElement>document.getElementById('description3')).textContent);
    this.courseForm3.controls['type'].setValue((<HTMLInputElement>document.getElementById('type3')).textContent);
    this.courseForm3.controls['cap'].setValue((<HTMLInputElement>document.getElementById('cap3')).textContent);

    if(this.selectedCourse.value == ''){
      console.log("Course empty");
    } else {
    //collect and add data to db
    this.crudService.AddCourse(this.courseForm.value)
      .subscribe(() => {
        console.log('Data added successfully')
        this.ngZone.run(() => this.router.navigateByUrl('/course-list'))
      }, (err) => {
        console.log(err);
      });
    }
    if(this.selectedCourse2.value == ''){
      console.log("Course empty")
    } else {
    this.crudService.AddCourse(this.courseForm2.value)
      .subscribe(() => {
        console.log('Data added successfully')
        this.ngZone.run(() => this.router.navigateByUrl('/course-list'))
      }, (err) => {
        console.log(err);
      });
    }
    if(this.selectedCourse3.value ==''){
      console.log("Course empty")
    } else {
    this.crudService.AddCourse(this.courseForm3.value)
      .subscribe(() => {
        console.log('Data added successfully')
        this.ngZone.run(() => this.router.navigateByUrl('/course-list'))
      }, (err) => {
        console.log(err);
      });
  }
}

}
