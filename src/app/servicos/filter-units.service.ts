import { Injectable } from '@angular/core';
import { ILocation } from 'src/app/types/location.interface';

const OPENING_HOUR = {

  morning: {
    first: '06',
    last: '12',
  },
  afternoon: {
    first: '06',
    last: '18',
  },
  night: {
    first: '18',
    last: '23',
  }

}
type HOUR_INDEXES = 'morning' | 'afternoon' | 'night'

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  transformWeekday(weekday: number) {
    switch (weekday) {
      case 0:
        return 'Dom.'
      case 6:
        return 'Sab.'
      default:
        return 'Seg. a Sex.'

    }
  }
  filterUnits(unit: ILocation, open_hour: string, close_hour: string) {
    let open_hour_filter = parseInt(open_hour, 10)
    let close_hour_filter = parseInt(close_hour, 10)

    let todays_weekday = this.transformWeekday(new Date().getDay());



    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour
      let schedule_weekday = unit.schedules[i].weekdays

      if (todays_weekday === schedule_weekday) {
        if (schedule_hour !== 'Fechada') {
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ')// (transform) at units em números enteiros ...
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10)
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10)

          if (unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) return true // > Se a hora de abertura for menor que a abertura do filtro, E se na hora de fechar ,for maior que a hora fechar do filtro ele me retorna como true!!
          else return false
        }

      }

    }

    return false;

  }
  filter(result: ILocation[], showClosed: boolean, hour: HOUR_INDEXES) {



    let intermediateResults = result;


    if (!showClosed) {
      intermediateResults = result.filter(location => location.opened === true);  /*caso eu não mostre os fechados, irei mostrar os abertos */
    }

    if (hour) {
      const OPEN_HOUR = hour === 'afternoon' ? OPENING_HOUR.afternoon.first : hour === 'morning' ? OPENING_HOUR.morning.first : OPENING_HOUR.night.first // if ternario
      const CLOSE_HOUR = hour === 'afternoon' ? OPENING_HOUR.afternoon.last : hour === 'morning' ? OPENING_HOUR.morning.last : OPENING_HOUR.night.last
      //return [intermediateResults].filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR)) 
      console.log(intermediateResults)
      return []

    } else {
      return intermediateResults;

    }
  }
  isWithinPeriod(scheduleHour: string, periodStart: string, periodEnd: string): boolean {
    const [startHour, endHour] = scheduleHour.split(' às ').map(h => h.replace('h', ':'));
    return !(endHour <= periodStart || startHour >= periodEnd);
  }

  filterLocations(locations: ILocation[], period: 'morning' | 'afternoon' | 'night', includeClosed: boolean = false): ILocation[] {
    const periodHours: Record<'morning' | 'afternoon' | 'night', [string, string]> = {
      'morning': ['06:00', '12:00'],
      'afternoon': ['12:01', '18:00'],
      'night': ['18:01', '23:00']
    };


    const [periodStart, periodEnd] = periodHours[period];

    return locations.filter(location => {
      if (!includeClosed && !location.opened) return false
      if (!location.schedules) return false
      return location.schedules.some(schedule =>
        this.isWithinPeriod(schedule.hour, periodStart, periodEnd)
      );
    });
  }
}



