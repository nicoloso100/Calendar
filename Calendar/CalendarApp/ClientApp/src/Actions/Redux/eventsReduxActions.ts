export const fetchEventsBegin = (): IFetchEventsBegin => ({
  type: 'FETCH_EVENTS_BEGIN',
});

export const fetchEventsSuccess = (events: IEvent[]): IFetchEventsSuccess => ({
  type: 'FETCH_EVENTS_SUCCESS',
  payload: events,
});

export const fetchEventsFailure = (message: string): IFetchEventsFailure => ({
  type: 'FETCH_EVENTS_FAILURE',
  payload: message,
});
