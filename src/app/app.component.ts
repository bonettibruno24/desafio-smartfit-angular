import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILocation } from './types/location.interface';
import { GetUnitsService } from './services/get-units.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showList = new BehaviorSubject(false);
  unitsList: ILocation[] = [];
   constructor(private unitsService: GetUnitsService){}

    onSubmit() {

      this.showList.next(true);
      this.unitsList = this.unitsService.getFilterdUnits();
   }
   



}

