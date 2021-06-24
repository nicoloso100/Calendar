import { IsDevelopment } from '../../Utils/environment';

export const baseURL = IsDevelopment ? 'http://localhost:5000/api/' : '/api/';

export const eventsURLs = {
  getEvents: `${baseURL}Events/GetEvents`,
  createEvents: `${baseURL}Events/CreateEvent`,
  updateEvents: `${baseURL}Events/UpdateEvent`,
  deleteEvents: `${baseURL}Events/DeleteEvent`,
};

export const generalURLs = {
  getCities: `${baseURL}General/GetCities`,
  getColor: `${baseURL}General/GetColors`,
};
