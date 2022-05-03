import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDoctorComponent } from './components/create-doctor/create-doctor.component';
import { CreateDonationComponent } from './components/create-donation/create-donation.component';
import { CreateDonorComponent } from './components/create-donor/create-donor.component';
import { CreatePlaceComponent } from './components/create-place/create-place.component';
import { DonationListComponent } from './components/donation-list/donation-list.component';
import { LoginComponent } from './components/login/login.component';
import { PlaceListComponent } from './components/place-list/place-list.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:'', component: WelcomePageComponent},
  {path:'donationplaces', component: PlaceListComponent},
  {path:'newdonationplaces', component: CreatePlaceComponent, canActivate: [AuthGuard]},
  {path:'donations', component: DonationListComponent},
  {path:'newdonation', component: CreateDonationComponent, canActivate: [AuthGuard]},
  {path:'createnewdonor', component: CreateDonorComponent, canActivate: [AuthGuard]},
  {path:'createnewdoctor', component: CreateDoctorComponent, canActivate: [AuthGuard]},
  {path:'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
