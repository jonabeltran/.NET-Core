import { Component, OnInit } from '@angular/core';
import { GaleryService } from '../../services/galery.service';
import { GaleryInterface } from '../../models/galery-interface';

@Component({
  selector: 'app-photo-form2',
  templateUrl: './photo-form2.component.html',
  styleUrls: ['./photo-form2.component.css']
})
export class PhotoForm2Component implements OnInit {

  public myInfo: string = 'info extra foto';
  public files: string[] = [];
  public actualizar: boolean = false;
  galerys: GaleryInterface[];

  //variables para el paginado
  totalpaginas: number = 1;

  constructor(private galeryService: GaleryService) { }

  ngOnInit(): void {
    this.actualizateTable();
  }

  showOutput(event){
   /* console.log(event.datos);
    console.log(event.filesSend);
    this.myInfo = event.datos;
    this.files = event.filesSend; */
    if (event.state){
      this.actualizateTable();
    }
  }

  actualizateTable(): void{
    this.galeryService.getGalery()
    .subscribe(
      res => {
      //  this.galerys = res;
        console.log('tenemos cara: ' + res.headers.get('totalpaginas'));
        console.log('tenemos cara: ' + res.headers.get('cantregistros'));
        this.totalpaginas = Number( res.headers.get('totalpaginas') );
        this.galerys = res.body;
      },
      err => console.log(err)
    );
  }

}
