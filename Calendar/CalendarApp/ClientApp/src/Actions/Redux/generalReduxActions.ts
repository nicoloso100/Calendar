//Cities
export const fetchCitiesBegin = (): IFetchCitiesBegin => ({
  type: 'FETCH_CITIES_BEGIN',
});

export const fetchCitiesSuccess = (events: ICity[]): IFetchCitiesSuccess => ({
  type: 'FETCH_CITIES_SUCCESS',
  payload: events,
});

export const fetchCitiesFailure = (message: string): IFetchCitiesFailure => ({
  type: 'FETCH_CITIES_FAILURE',
  payload: message,
});

//Colors
export const fetchColorsBegin = (): IFetchColorsBegin => ({
  type: 'FETCH_COLORS_BEGIN',
});

export const fetchColorsSuccess = (events: IColor[]): IFetchColorsSuccess => ({
  type: 'FETCH_COLORS_SUCCESS',
  payload: events,
});

export const fetchColorsFailure = (message: string): IFetchColorsFailure => ({
  type: 'FETCH_COLORS_FAILURE',
  payload: message,
});
