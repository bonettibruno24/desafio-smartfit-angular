import { ILocation } from '../../types/location.interface'
import { Component, Input, OnInit } from '@angular/core';
import { GetUnitsService } from 'src/app/services/get-units.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent implements OnInit {
  @Input() unitsList: ILocation[] = [];
  @Input() card: ILocation[] = [];

    constructor() {

    }
    ngOnInit(): void {
     console.log(this.unitsList)
    
    }
      

  }
