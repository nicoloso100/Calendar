const initialState: IGetCitiesState = {
  cities: [],
  loading: false,
  error: null,
};

export default function getCitiesReducer(
  state = initialState,
  action: ICitiesAction
): IGetCitiesState {
  switch (action.type) {
    case 'FETCH_CITIES_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_CITIES_SUCCESS':
      return {
        ...state,
        loading: false,
        cities: action.payload,
      };
    case 'FETCH_CITIES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        cities: [],
      };
    default:
      return state;
  }
}
