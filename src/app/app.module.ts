import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CensusListComponent } from './components/course-components/census-list/census-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CensusDetailComponent } from './components/course-components/census-detail/census-detail.component';
import { AddCensusComponent } from './components/course-components/add-census/add-census.component';
import { RemoveCensusComponent } from './components/course-components/remove-census/remove-census.component';



@NgModule({
  declarations: [
    AppComponent,
    CensusListComponent,
    CensusDetailComponent,
    AddCensusComponent,
    RemoveCensusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
