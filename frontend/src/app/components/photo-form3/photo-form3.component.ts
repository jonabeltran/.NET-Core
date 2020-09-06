import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { PhotoService } from '../../services/photo.service';
import { environment } from '../../../environments/environment.prod';
import { GaleryService } from '../../services/galery.service';
import { GaleryInterface } from '../../models/galery-interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-photo-form3',
  templateUrl: './photo-form3.component.html',
  styleUrls: ['./photo-form3.component.css']
})
export class PhotoForm3Component implements OnInit {

  @Output() salida = new EventEmitter();
  formGroup: FormGroup;
  imageForm: FormGroup;
  image: any = '../../../assets/no-image.jpg';
  file: any;
  arrayFiles: string[] = [] ;
  public filesSend: string[];
  URL: string = environment.url + '/Upload/';
  dataSave: GaleryInterface = { title: null, description: null, url: null, id_user: null };

  constructor(private photoService: PhotoService, private galeryService: GaleryService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      file: new FormControl(null, Validators.required)
    });

    this.formGroup = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  onFileChange(event): void{
    if (event.target.files && event.target.files.length > 0){
      const file = event.target.files[0];
      if (file.type.includes('image')){
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function load(): void {
          this.image = reader.result;
        }.bind(this);

        this.file = file;
      }
    }
  }

  onSubmit(event): void{

    const form = this.imageForm;
    if (form.valid){
      //lo vacio
      this.imageForm = new FormGroup({
        file: new FormControl(null)
      });

      //pongo la imagen por defecto  
      this.image = '../../../assets/no-image.jpg';


      this.pasarinfo(this.file);
    }
  }

  pasarinfo(archivo): void{
    //primero guardo la foto al servidor
    this.photoService.createPhoto(this.file)
    .subscribe(
      res => {
        if(res.state){
          this.arrayFiles.push(res.fileName);
        //  this.salida.emit({datos: title, filesSend: this.arrayFiles});
        }else{
          console.log(res.error);
        }

      },
      err => console.log(err)
    );
  }

  onSave(event): void{
    const form = this.formGroup;
    let cadena: string = '';
    if (form.valid){
      this.dataSave.title = form.value.title;
      this.dataSave.description = form.value.description;
      for (let nameFile of this.arrayFiles){
        cadena += nameFile + ';';
      }
      this.dataSave.url = cadena;
      this.dataSave.id_user = +this.authService.getId_user();

      this.galeryService.createPhoto(this.dataSave)
      .subscribe(
        res => {
          if (res.status){
            this.salida.emit({state: true});
           //limpio todo
            this.imageForm = new FormGroup({
              file: new FormControl(null)
            });
            this.arrayFiles = [];
            this.formGroup = new FormGroup({
              title: new FormControl(null),
              description: new FormControl(null)
            });
          }
        },
        err => console.log(err)
      );
    }
  }
}
