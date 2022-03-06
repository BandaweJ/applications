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
import { ApplicationsService } from './shared/applications-service.service';
import { TrackService } from './track/track.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthComponent } from './auth/auth.component';
import { DisplayApplicationComponent } from './display-application/display-application.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MessagesComponent } from './messages/messages.component';
import { LoadingSpinnerService } from './shared/loading-spinner/loading-spinner.service';
import { MessagesService } from './messages/messages.service';

@NgModule({
  declarations: [
    AuthComponent,
    AppComponent,
    NavigationComponent,
    NewComponent,
    TrackComponent,
    ManageComponent,
    SigninComponent,
    SignupComponent,
    ManageApplicationsComponent,
    ManageSchoolsComponent,
    LoadingSpinnerComponent,
    DisplayApplicationComponent,
    UserProfileComponent,
    MessagesComponent,
    //AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [
    SchoolsService,
    ApplicationsService,
    TrackService,
    LoadingSpinnerService,
    MessagesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
