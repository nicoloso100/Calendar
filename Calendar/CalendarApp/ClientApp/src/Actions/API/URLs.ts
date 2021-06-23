import { IsDevelopment } from '../../Utils/environment';

export const baseURL = IsDevelopment ? 'http://localhost:4000/api/' : '/api/';

export const eventsURLs = {
  getEvents: `${baseURL}/GetAllEvents`,
};
