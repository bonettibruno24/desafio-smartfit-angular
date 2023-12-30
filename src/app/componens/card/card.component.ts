import { Component, Input, OnInit } from '@angular/core';
import { ILocation } from 'src/app/types/location.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  @Input() card!: ILocation;

  constructor() { }
  
  ngOnInit(): void {
    

  }



}
