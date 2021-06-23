declare interface IFetchEventsBegin {
  type: FETCH_EVENTS_BEGIN;
}

declare interface IFetchEventsSuccess {
  type: FETCH_EVENTS_SUCCESS;
  payload: IEvent[];
}

declare interface IFetchEventsFailure {
  type: FETCH_EVENTS_FAILURE;
  payload: string;
}

declare type IEventsAction = IFetchEventsBegin | IFetchEventsSuccess | IFetchEventsFailure;
