declare interface ICity {
  id: string;
  name: string;
}

declare interface IColor {
  id: string;
  code: string;
}

declare interface IEventsModal {
  open: boolean;
  date: Date | null;
  events: IEvent[];
}

declare interface ICreateEventModal {
  open: boolean;
  date: Date | null;
}

declare interface IEditEventModal {
  open: boolean;
  event: IEvent | null;
}

declare interface IDeleteEventModal {
  open: boolean;
  eventId: string | null;
}
