import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './components/course-components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-components/course-detail/course-detail.component';
import { AddCourseComponent } from './components/course-components/add-course/add-course.component';
import { RemoveCourseComponent } from './components/course-components/remove-course/remove-course.component';
import { LoginPageComponent } from './components/student-components/login-page/login-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login-page' },
  { path: 'course-list', component: CourseListComponent },
  { path: 'edit-course/:id', component: CourseDetailComponent},
  { path: 'add-course', component: AddCourseComponent},
  { path: 'remove-course/:id', component: RemoveCourseComponent},
  { path: 'login-page', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
