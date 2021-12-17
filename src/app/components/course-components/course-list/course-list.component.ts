import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../service/crud.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  Course:any = [];
 
  constructor(private crudService: CrudService) { }
 
  ngOnInit(): void {
    this.crudService.GetAllCourse().subscribe(res => {
      console.log(res)
      this.Course =res;
    });    
  }
}
