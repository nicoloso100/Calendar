declare type FETCH_EVENTS_BEGIN = 'FETCH_EVENTS_BEGIN';
declare type FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
declare type FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';
declare type FETCH_EVENTS = FETCH_EVENTS_BEGIN | FETCH_EVENTS_SUCCESS | FETCH_EVENTS_FAILURE;

declare interface IGetEventsState {
  events: IEvent[];
  loading: boolean;
  error: null | string;
}
