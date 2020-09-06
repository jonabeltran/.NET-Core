import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { CountryInterface } from '../models/country-interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private URL: string = environment.url;

  constructor(private http: HttpClient) { }

  getCountry(){
    return this.http.get<CountryInterface[]>(this.URL + '/country');
  }
}
