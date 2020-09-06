import { Component, OnInit } from '@angular/core';
import { GaleryInterface } from '../../models/galery-interface';
import { GaleryService } from '../../services/galery.service';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  galery: GaleryInterface;
  file: File;
  photoSelected: string | ArrayBuffer;
  dataSave: GaleryInterface = { title: null, description: null, url: null, id_user: null };

  constructor(private galeryService: GaleryService, private photoService: PhotoService,
    private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onPhotoSelected(event: HtmlInputEvent): void{
    if (event.target.files && event.target.files[0]){
      this.file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  } 

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean{
  /*  this.galery.title = title.value;
    this.galery.description = description.value;
    this.galery.url = this.file.name;
    this.galery.id_user = 3;*/

   

    this.photoService.createPhoto(this.file)
    .subscribe(
      res => {
        if(res.state)
        {
          this.dataSave.title = title.value;
          this.dataSave.description = description.value;
          this.dataSave.url = res.fileName;
          this.dataSave.id_user = +this.authService.getId_user(); // por ahora ----
          this.saveData();
        }
      },
      err => console.log(err)
    );

    return false;
  }

  saveData(): void{
    this.galeryService.createPhoto(this.dataSave)
      .subscribe(
        res =>{
          if(res.status){
            this.router.navigate(['/galery']);
          }
        },
        err => console.log(err)
      );
  }

}
