const initialState: IGetEventsState = {
  events: [],
  loading: false,
  error: null,
};

export default function getEventsReducer(
  state = initialState,
  action: IEventsAction
): IGetEventsState {
  switch (action.type) {
    case 'FETCH_EVENTS_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_EVENTS_SUCCESS':
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case 'FETCH_EVENTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        events: [],
      };
    default:
      return state;
  }
}
