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

export const CreateEvent = async (newEvent: ICreateEvent) => {
  const request = await new HttpRequest().Post<string>(eventsURLs.createEvents, newEvent);
  if (request.okay && request.message) {
    return request.message;
  } else {
    throw Error(request.message);
  }
};

export const UpdateEvent = async (updatedEvent: IUpdateEvent) => {
  const request = await new HttpRequest().Put<string>(eventsURLs.updateEvents, updatedEvent);
  if (request.okay && request.message) {
    return request.message;
  } else {
    throw Error(request.message);
  }
};

export const DeleteEvent = async (eventId: string) => {
  const request = await new HttpRequest().Delete<string>(
    `${eventsURLs.deleteEvents}?eventId=${eventId}`
  );
  if (request.okay && request.message) {
    return request.message;
  } else {
    throw Error(request.message);
  }
};
