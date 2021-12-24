import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../service/crud.service';
import { LoginPageComponent } from '../../student-components/login-page/login-page.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  Course:any = [];
 ////this needs to be passed from LoginPageComponent and it will work
 ////for now just using a place holder
  studentId: any = "61bd099d595d8c5bce7a325e"; 

  constructor(private crudService: CrudService) { }
 
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

}
