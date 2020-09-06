import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Output() salida = new EventEmitter();
  public datos: string;
  imageForm: FormGroup;
  image: any = '../../../assets/no-image.jpg';
  file: any;
  //arrayFiles: File[] = [] ;
  //public filesSend: File[];
  arrayFiles: string[] = [] ;
  public filesSend: string[];

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.imageForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      file: new FormControl(null, Validators.required)
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
        name: new FormControl(null),
        file: new FormControl(null)
      });

      //pongo la imagen por defecto  
      this.image = '../../../assets/no-image.jpg';


      this.pasarinfo(form.value.name, this.file);
    }
  }

  pasarinfo(title, archivo): void{
    //primero guardo la foto al servidor
    this.photoService.createPhoto(this.file)
    .subscribe(
      res => {
        if(res.state){
          this.arrayFiles.push(res.fileName);
          this.salida.emit({datos: title, filesSend: this.arrayFiles});
        }else{
          console.log(res.error);
        }

      },
      err => console.log(err)
    );
  }

}
