import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { GaleryInterface } from '../models/galery-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private URL: string = environment.url;

  constructor(private http: HttpClient) { }

  createPhoto(photo: File){
  //  const fd = new FormData();
  //  fd.append('image', photo);
    const formData: FormData = new FormData();
    formData.append('file', photo);
   // return this.http.post(this.URL + '/upload', formData);
    return this.http.post(this.URL + '/api/ImageUpload', formData);
  }

  getPhotos(){
    return this.http.get<GaleryInterface[]>(this.URL );
  }
}
