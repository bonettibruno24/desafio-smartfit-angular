import { Component, EventEmitter, OnInit, Output } from '@angular/core';  
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { FilterUnitsService } from 'src/app/servicos/filter-units.service';
import { ILocation } from 'src/app/types/location.interface';



@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})

export class FormsComponent implements OnInit {
  @Output() submitEvent = new EventEmitter();
  result: ILocation[] = [] ;
  filteredResults?: ILocation[]  ;
  formGroup!: FormGroup;
  filteredLocationsSize: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private unitService: GetUnitsService, 
    private filterUnitsService: FilterUnitsService) { } // IREI COMPARTILHAR OS DADOS NO CARD, ATRAVES DO FILTERUNITSSERVICE.
    
  ngOnInit(): void  {
  
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false
    })
    this.unitService.getAllUnits().subscribe(data => {
      this.result = data;
      this.filteredResults = data;
    });
    
  }

    onSubmit(): void {  
       // let { showClosed, hour } = this.formGroup.value 
        //this.filteredResults = this.filterUnitsService.filter(this.result, showClosed, hour)

      const hour = this.formGroup.value?.hour
      const showClosed = this.formGroup.value?.showClosed
      const filteredLocations = this.filterUnitsService.filterLocations(this.result, hour, showClosed);
      
      //console.log(filteredLocations.length)

      this.filteredResults = filteredLocations;
      this.filteredLocationsSize = filteredLocations.length;
         this.unitService.setFilteredUnits(this.filteredResults);


         this.submitEvent.emit();


      }
    
    onClean(): void {
      this.formGroup.reset();
    } 
    
  }
  //setFilteredUnits(value: ILocation[]) {
   // this.filteredUnits = value;
  //}



