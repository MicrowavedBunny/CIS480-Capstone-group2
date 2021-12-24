import { Injectable } from '@angular/core';
import { Course } from './Course';
import { Student } from './Student';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
 
export class CrudService {
 
  // Node/Express API
  REST_API: string = 'http://localhost:8000/api';
 
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
 
  constructor(private httpClient: HttpClient) { }
 
  // Get all course
  GetAllCourse() {
    return this.httpClient.get(`${this.REST_API}`);
  }
 
  //Get a single course
  GetCourse(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-course/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders})
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  // Update
  updateCourse(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-course/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders})
      .pipe(
        catchError(this.handleError)
      )
  }

  //Add course
  AddCourse(data: Course): Observable<any> {
    let API_URL = `${this.REST_API}/add-course`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

//Delete
  RemoveCourse(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/remove-course/${id}`;
    return this.httpClient.delete(API_URL, {headers: this.httpHeaders})
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }

    //Add student
    AddStudent(data: Student): Observable<any> {
      let API_URL = `${this.REST_API}/register-page`;
      return this.httpClient.post(API_URL, data)
        .pipe(
          catchError(this.handleError)
        )
    }

    GetCredintials(): Observable<any> {
      let API_URL = `${this.REST_API}/login-page`;
      return this.httpClient.get(API_URL, { headers: this.httpHeaders})
        .pipe(map((res: any) => {
          return res || {}
        }),
          catchError(this.handleError)
        )
    }

  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
