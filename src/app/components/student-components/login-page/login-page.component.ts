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
  ngOnInit(): void { }

  onLogin(): any { 
this.ngZone.run(() => this.router.navigateByUrl('/course-list'))
}  
onRegisterClick(): any { 
this.ngZone.run(() => this.router.navigateByUrl('/register-page'))
}
}
