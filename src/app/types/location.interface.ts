
export interface ILocation {
    id: number,
    title: string,
    content: string,
    opened: boolean,
    mask: string,
    towel: string,
    fountain: string,
    locker_room: string,
    schedules: IScheduler []
}

interface IScheduler {
          weekdays: string,
          hour: string, 
}
      