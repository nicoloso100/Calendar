const initialState: IGetEventsState = {
  events: [],
  loading: false,
  error: null,
};

export default function eventsReducer(state = initialState, action: IEventsAction) {
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
        items: action.payload,
      };
    case 'FETCH_EVENTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
      };
    default:
      return state;
  }
}
