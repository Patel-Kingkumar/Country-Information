import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CountryServiceService } from '../country-service.service';

@Component({
  selector: 'app-all-country',
  templateUrl: './all-country.component.html',
  styleUrls: ['./all-country.component.scss']
})
export class AllCountryComponent {
  allCountry: any = "";
  countryContinents: any = "";
  searchText: any = "";
  selectedValue: any = "";
  filterCountry: any = "";

  popSort: any = "";
  sortInfo: any = true;

  selectVal: any = "";
  selectCountry: any = "";

  constructor(private router: Router, private countryService: CountryServiceService) { }

  ngOnInit(): void {
    this.countryService.getCountry().subscribe((country: any) => {
      this.allCountry = country;
      this.filterCountry = this.allCountry;

      this.countryContinents = this.filterCountry.map((ele: any) => ele.continents[0]).filter((ele: any, i: any, arr: any) => arr.indexOf(ele) == i);
    })

  }



  details(countryName: any) {
    this.router.navigate(["/country-details", countryName])
  }

  onChange(event: any) {
    this.selectVal = event.value;
    if(event.value != "allcountries") {
      this.filterCountry = this.allCountry.filter((data: any) => data.continents[0] == event.value || data.continents[1] == event.value);
      this.selectCountry = this.filterCountry;
    } else {
      this.filterCountry = this.allCountry;
      this.selectCountry = this.filterCountry;
    }
  }

  sort() {
    this.popSort = this.filterCountry.map((data: any) => data).filter((ele: any, i: any, arr: any) => arr.indexOf(ele) == i);
    this.sortInfo = !this.sortInfo;
    if(this.sortInfo) {
      this.popSort.sort((a: any, b: any) => a.population - b.population);
    } else {
      this.popSort.sort((a: any, b: any) => b.population - a.population);
    }
    this.filterCountry = this.popSort;
  }

  onSearchCountry(val: any) {
    var country = Object.values(this.allCountry).map((d: any) => d);
    if (this.searchText !== "") {
      val.target.value = this.searchText.toLocaleLowerCase();
      if(this.selectCountry != "") {
        this.filterCountry = this.selectCountry.filter((e: any) => {
          return e.name.common.toLocaleLowerCase().match(val.target.value);
        });
      } else {
        this.filterCountry = country.filter((e: any) => {
          return e.name.common.toLocaleLowerCase().match(val.target.value);
        });
      }
    }
  }
}

