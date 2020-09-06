import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { CountryInterface } from '../../models/country-interface';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  countrys: CountryInterface[];
  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getCountry()
    .subscribe(
      res => {
        console.log(res);
        this.countrys = res;
      },
      err => console.log(err)
    );
  }

}
