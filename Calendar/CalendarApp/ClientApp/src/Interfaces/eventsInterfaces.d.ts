declare interface ICreateEvent {
  name: string;
  description?: string;
  place: string;
  color?: string;
  date: Date;
  startTime: Date | string;
  endTime: Date | string;
}

declare interface IUpdateEvent extends ICreateEvent {
  id: string;
}

declare interface IEvent {
  id: string;
  name: string;
  description?: string;
  place: ICity;
  color?: IColor;
  date: Date;
  startTime: Date;
  endTime: Date;
}
