import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  register: FormGroup;
  Student: any = [];

  studentId: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.register = this.formBuilder.group({})

    this.loginForm = this.formBuilder.group({
      Email: [''],
      Password: ['']
    })
  }
  ngOnInit(): void {

    this.crudService.GetCredintials().subscribe(res => {
      console.log(res)
      this.Student = res;
    });

  }

  onLogin(): any {
    var emailInput = (<HTMLInputElement>document.getElementById('emailInput')).value.trim();
    var passInput = (<HTMLInputElement>document.getElementById('passInput')).value.trim();
    var emailFormat = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    
    const user = this.Student.find((student:any) =>student.email === emailInput && student.password === passInput);
  
    if (!emailInput.match(emailFormat)) {
      alert("Please enter a valid email!");
    } else if (passInput == '') {
      alert("Password field can not be empty!");
    } else if (user) {
      // we have user in database
      console.log("successful login");
    } else {
      alert("The Email and Password do not match!");
    }

    for (let i = 0; i < this.Student.length; i++) {

      if (emailInput == this.Student[i].email) {
        console.log('email success');
        if (passInput == this.Student[i].password) {
          console.log('pasword success');
          //get the id
          console.log(this.Student[i]._id);
          this.studentId = this.Student[i]._id;
          localStorage.setItem("studentId", this.Student[i]._id);

          this.crudService.getCourseByOwner(this.studentId).subscribe(res => { console.log(res);
            if (res.length == 0){
              this.ngZone.run(() => this.router.navigateByUrl('/add-course'))
            }else{
            this.ngZone.run(() => this.router.navigateByUrl('/course-list'))
            }
          });
        } 
      } 
    }
  }
  onRegisterClick(): any {
    this.ngZone.run(() => this.router.navigateByUrl('/register-page'))
  }

}