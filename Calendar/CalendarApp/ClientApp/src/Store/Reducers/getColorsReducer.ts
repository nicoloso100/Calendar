const initialState: IGetColorsState = {
  colors: [],
  loading: false,
  error: null,
};

export default function getColorsReducer(
  state = initialState,
  action: IColorsAction
): IGetColorsState {
  switch (action.type) {
    case 'FETCH_COLORS_BEGIN':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_COLORS_SUCCESS':
      return {
        ...state,
        loading: false,
        colors: action.payload,
      };
    case 'FETCH_COLORS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        colors: [],
      };
    default:
      return state;
  }
}
