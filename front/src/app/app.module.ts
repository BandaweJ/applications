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
import { TrackService } from './track/track.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
//import { AuthComponent } from './auth/auth.component';

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
    LoadingSpinnerComponent,
    //AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [SchoolsService, ApplicationsService, TrackService],
  bootstrap: [AppComponent],
})
export class AppModule {}
