import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { GaleryInterface } from '../models/galery-interface';
import { AuthService } from './auth.service';
import { CountryInterface } from '../models/country-interface';
import { NgModel } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GaleryService {

  private URL: string = environment.url;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getGalery(){


    let params = new HttpParams();
    params = params.append('id_user', this.authService.getId_user());
    params = params.append('pagina', '3');
    params = params.append('cantidadMostrar', '3');
   // return this.http.get<GaleryInterface[]>(this.URL + '/galery' , {params} );
    return this.http.get<GaleryInterface[]>(this.URL + '/galery' , { observe: 'response', params} );//body
  }

  getPhoto(id: number){
    return this.http.get<GaleryInterface>(this.URL + '/galery/' + id);
  }

  createPhoto(galery: GaleryInterface){
    return this.http.post<GaleryInterface>(this.URL + '/galery', galery);
  }
}
