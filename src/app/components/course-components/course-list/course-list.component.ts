import { Component, OnInit, NgZone } from '@angular/core';
import { Student } from 'src/app/service/Student';
import { CrudService } from '../../../service/crud.service';
import { LoginPageComponent } from '../../student-components/login-page/login-page.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  getId: any; 
  Course:any = [];
 ////this needs to be passed from LoginPageComponent and it will work
 ////for now just using a place holder
 studentId: any = localStorage.getItem("studentId"); //"61bd099d595d8c5bce7a325e"; 

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService) { 

    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
  }
 
  /*ngOnInit(): void {
    this.crudService.GetAllCourse().subscribe(res => {
      console.log(res)
      this.Course =res;
    });    
  }
*/

ngOnInit(): void {
  console.log(this.studentId);
  this.crudService.getCourseByOwner(this.studentId).subscribe(res => {
    console.log(res)
    this.Course =res;
  });    
}

onLogout(){
  this.ngZone.run(() => this.router.navigateByUrl('login-page'));
}

onAdd(){
  this.ngZone.run(() => this.router.navigateByUrl('add-course'));
}

onDelete(ref:any): any {
  var id = ref.value;
  //call the method to actually remove the course
  if (confirm('Are you sure you want to drop this course?')) {
  this.crudService.RemoveCourse(id)
    .subscribe(() =>{
      //send the user back to the list of course
      window.location.reload();
      //this.ngZone.run(() => this.router.navigateByUrl('course-list'))
    }, (err) => {
      console.log(err)
    })
  }
}
}
