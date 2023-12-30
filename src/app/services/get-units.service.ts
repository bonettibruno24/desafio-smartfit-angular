import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/Units-response.interface';
import { ILocation } from '../types/location.interface';





@Injectable({
  providedIn: 'root'
})
  export class GetUnitsService {
    
  readonly apiUrl = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";
  private filteredResults?: ILocation[]
  private allUnitsSubject : BehaviorSubject<ILocation[] > = new BehaviorSubject<ILocation[]>([]);   //transformei o meu subject em alguém que eu posso observar.
  private allUnits$: Observable <ILocation[]> = this.allUnitsSubject.asObservable();
  private allUnits: ILocation[] = [] ;
  private filteredUnits: ILocation[] = [];
 

  

  constructor(private httpClient: HttpClient) { 

     this.httpClient.get<UnitsResponse>(this.apiUrl).subscribe(data => {
      this.allUnitsSubject.next(data.locations);
      this.filteredResults = data.locations
      console.log(data, 'avioes do forro');
    });
  
  }
  
  getAllUnits(): Observable<ILocation[]> {
    return this.allUnits$
  }
  getFilterdUnits() {
    return this.filteredUnits;

  }
  setFilteredUnits(value: ILocation[]) {
    this.filteredUnits = value;


  }
}
