import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCountryComponent } from './all-country/all-country.component';
import { CountryDetailsComponent } from './country-details/country-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'all-country', pathMatch: 'full' },
  { path: 'all-country', component: AllCountryComponent },
  { path: 'country-details/:border', component: CountryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
