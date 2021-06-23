import { HttpRequest } from './httpRequest';
import { eventsURLs } from './URLs';

export const GetEvents = async () => {
  const request = await new HttpRequest().Get<IEvent[]>(eventsURLs.getEvents);
  if (request.okay && request.data) {
    return request.data;
  } else {
    throw Error(request.message);
  }
};
