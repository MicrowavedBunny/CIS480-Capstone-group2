import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {

  registerAccForm: FormGroup;
   
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.registerAccForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    })
   }

  ngOnInit(): void {  }

  onRegister(): any {
    var reEnter = (<HTMLInputElement>document.getElementById('reenterpass')).value;
    var pass = (<HTMLInputElement>document.getElementById('pass')).value;
    var emailRegex = (<HTMLInputElement>document.getElementById('emailInput')).value;
    var firstName = (<HTMLInputElement>document.getElementById('first')).value;
    var lastName = (<HTMLInputElement>document.getElementById('last')).value;

    if(firstName && lastName != ""){
    if (this.validateEmail(emailRegex)){
    if (reEnter && pass != ""){
    if (reEnter == pass){

    this.crudService.AddStudent(this.registerAccForm.value)
      .subscribe(() => {
        console.log('Data added successfully')
        this.ngZone.run(() => this.router.navigateByUrl('/login-page'))
      }, (err) => {
        console.log(err);
        alert('This email is already registered.');
      });
    }else{
      alert('You have re-entered you password wrong.');
    }

    } else {
      alert('Please re/enter a password.');
    }

    } else {
      alert('Please enter a valid email address.');
    }

  } else {
    alert('Please enter you first/last name.');
  }

  }

  validateEmail = (emailInput: string) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(emailInput);
  };

}
