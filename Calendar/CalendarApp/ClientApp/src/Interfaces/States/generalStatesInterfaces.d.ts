//Cities
declare type FETCH_CITIES_BEGIN = 'FETCH_CITIES_BEGIN';
declare type FETCH_CITIES_SUCCESS = 'FETCH_CITIES_SUCCESS';
declare type FETCH_CITIES_FAILURE = 'FETCH_CITIES_FAILURE';
declare type FETCH_CITIES = FETCH_CITIES_BEGIN | FETCH_CITIES_SUCCESS | FETCH_CITIES_FAILURE;

declare interface IGetCitiesState {
  cities: ICity[];
  loading: boolean;
  error: null | string;
}

//Colors
declare type FETCH_COLORS_BEGIN = 'FETCH_COLORS_BEGIN';
declare type FETCH_COLORS_SUCCESS = 'FETCH_COLORS_SUCCESS';
declare type FETCH_COLORS_FAILURE = 'FETCH_COLORS_FAILURE';
declare type FETCH_COLORS = FETCH_COLORS_BEGIN | FETCH_COLORS_SUCCESS | FETCH_COLORS_FAILURE;

declare interface IGetColorsState {
  colors: IColor[];
  loading: boolean;
  error: null | string;
}
