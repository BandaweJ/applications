import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './new/new.component';
import { TrackComponent } from './track/track.component';
import { ManageComponent } from './manage/manage.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ManageApplicationsComponent } from './manage-applications/manage-applications.component';
import { ManageSchoolsComponent } from './manage-schools/manage-schools.component';

const routes: Routes = [
  { path: 'new', component: NewComponent },
  { path: 'track', component: TrackComponent },
  { path: 'manage', component: ManageComponent, children: [
    { path: 'applications', component: ManageApplicationsComponent },
    { path: 'schools', component: ManageSchoolsComponent },
  ]
 },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: '',   redirectTo: 'new', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: NewComponent },//Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
