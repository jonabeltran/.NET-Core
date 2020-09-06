import { Component, OnInit } from '@angular/core';
import { GaleryInterface } from '../../models/galery-interface';
import { GaleryService } from '../../services/galery.service';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {

  galerys: GaleryInterface[];
  URL: string = environment.url + '/Images/';
 // URL: string = '../../../../../myApi/Images/';
  
  //photos = [];

  constructor(private galeryService: GaleryService, private router: Router) { }

  ngOnInit(): void {
    this.galeryService.getGalery()
    .subscribe(
      res => {
        this.galerys = res.body;
      },
      err => console.log(err)
    );
  }

  selectedCard(id: number){
    /*this.galeryService.getPhoto(id)
    .subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );*/

    this.router.navigate(['photo-preview', id]);
  }

}
