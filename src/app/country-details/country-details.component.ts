import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryServiceService } from '../country-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {

  country: any = "";
  countryUrl: any = "";
  borderName: any = "";

  currencies: any = "";

  constructor(private location: Location, private router: Router, private route: ActivatedRoute, private countryService: CountryServiceService) { }


  ngOnInit(): void {
    this.countryService.getCountry().subscribe((countryData: any) => {
      this.countryUrl = this.route.snapshot.paramMap.get('border');
      this.country = countryData.filter((data: any) => this.countryUrl == data.cca3);
      this.currencies =  this.country[0].currencies;
      this.currencies = Object.values(this.currencies).map((data: any) => data);
    })
  }

  borders(borderName: any) {
    setTimeout(() => {
      this.router.navigate(['/country-details', borderName]);
      this.ngOnInit();
    }, 0);
  }

  goBack() {
    setTimeout(() => {
      this.location.back();
      this.ngOnInit();
    }, 0)
  }
}
