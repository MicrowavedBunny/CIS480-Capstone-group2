import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './components/course-components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-components/course-detail/course-detail.component';
import { AddCourseComponent } from './components/course-components/add-course/add-course.component';
import { RemoveCourseComponent } from './components/course-components/remove-course/remove-course.component';
import { StudentListComponent } from './components/student-components/student-list/student-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'course-list' },
  { path: 'course-list', component: CourseListComponent },
  { path: 'edit-course/:id', component: CourseDetailComponent},
  { path: 'add-course', component: AddCourseComponent},
  { path: 'remove-course/:id', component: RemoveCourseComponent},
  { path: 'student-list', component: StudentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
