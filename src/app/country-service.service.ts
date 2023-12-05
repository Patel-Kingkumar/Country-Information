import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  url = "https://restcountries.com/v3.1/all";

  constructor(private http: HttpClient) { }

  getCountry() {
    return this.http.get(this.url);
  }
}
