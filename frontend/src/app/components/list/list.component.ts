import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() informacion: string;
  @Input() photos: string[];
  URL: string = environment.url + '/Upload/';

  constructor() { }

  ngOnInit(): void {
  }

}
