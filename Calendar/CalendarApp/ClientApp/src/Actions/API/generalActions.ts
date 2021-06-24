import { HttpRequest } from './httpRequest';
import { generalURLs } from './URLs';

export const GetCities = async () => {
  const request = await new HttpRequest().Get<ICity[]>(generalURLs.getCities);
  if (request.okay && request.data) {
    return request.data;
  } else {
    throw Error(request.message);
  }
};

export const GetColors = async () => {
  const request = await new HttpRequest().Get<IColor[]>(generalURLs.getColor);
  if (request.okay && request.data) {
    return request.data;
  } else {
    throw Error(request.message);
  }
};
