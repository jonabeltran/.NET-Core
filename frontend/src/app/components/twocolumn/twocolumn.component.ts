import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-twocolumn',
  templateUrl: './twocolumn.component.html',
  styleUrls: ['./twocolumn.component.css']
})
export class TwocolumnComponent implements OnInit {

  @Input() bandera: string;

  constructor() { }

  ngOnInit(): void {
  }

  getBandera(): string{
     return this.bandera;
  }

}
