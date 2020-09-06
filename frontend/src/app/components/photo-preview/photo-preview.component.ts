import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { GaleryService } from '../../services/galery.service';
import { GaleryInterface } from '../../models/galery-interface';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  id: number;//comment
  photo: GaleryInterface = { title: null, description: null, url: null, id_user: null };
  URL: string = environment.url + '/myApi/Images/';

  constructor(private activateRoute: ActivatedRoute, private router: Router,
    private galeryService: GaleryService) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      this.galeryService.getPhoto(this.id)
      .subscribe(
        res => {
          this.photo = res;
        },
        err => console.log(err)
      );
    })
  }

  plusPhoto(){
    
  }
}
