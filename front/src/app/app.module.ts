import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NewComponent } from './new/new.component';
import { TrackComponent } from './track/track.component';
import { ManageComponent } from './manage/manage.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageApplicationsComponent } from './manage-applications/manage-applications.component';
import { ManageSchoolsComponent } from './manage-schools/manage-schools.component';
import { HttpClientModule } from '@angular/common/http';
import { SchoolsService } from './manage-schools/schools.service';
import { ApplicationsService } from './new/applications-service.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NewComponent,
    TrackComponent,
    ManageComponent,
    SigninComponent,
    SignupComponent,
    ManageApplicationsComponent,
    ManageSchoolsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [SchoolsService, ApplicationsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
