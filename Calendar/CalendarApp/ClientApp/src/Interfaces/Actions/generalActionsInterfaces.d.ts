//Cities
declare interface IFetchCitiesBegin {
  type: FETCH_CITIES_BEGIN;
}

declare interface IFetchCitiesSuccess {
  type: FETCH_CITIES_SUCCESS;
  payload: ICity[];
}

declare interface IFetchCitiesFailure {
  type: FETCH_CITIES_FAILURE;
  payload: string;
}

declare type ICitiesAction = IFetchCitiesBegin | IFetchCitiesSuccess | IFetchCitiesFailure;

//Colors
declare interface IFetchColorsBegin {
  type: FETCH_COLORS_BEGIN;
}

declare interface IFetchColorsSuccess {
  type: FETCH_COLORS_SUCCESS;
  payload: IColor[];
}

declare interface IFetchColorsFailure {
  type: FETCH_COLORS_FAILURE;
  payload: string;
}

declare type IColorsAction = IFetchColorsBegin | IFetchColorsSuccess | IFetchColorsFailure;
