using CalendarDomain;
using CalendarDTOs;
using CalendarRepository;
using CalendarUtils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalendarServices
{
    public class EventsServices : IEventsServices
    {
        private readonly IEventsRepository _eventsRepository;
        private readonly ICitiesRepository _citiesRepository;
        private readonly IColorsRepository _colorsRepository;
        public EventsServices(IEventsRepository eventsRepository, ICitiesRepository citiesRepository, IColorsRepository colorsRepository)
        {
            _eventsRepository = eventsRepository;
            _citiesRepository = citiesRepository;
            _colorsRepository = colorsRepository;
        }

        public async Task<List<DTOEvent>> GetAllEvents()
        {
            var eventsList = await _eventsRepository.FindAll();

            return eventsList;
        }

        public async Task<string> CreateEvent(DTOCreateEvent newEvent)
        {
            var eventDomain = CreateDomain(newEvent);
            await ValidatePlaceAndColor(place: eventDomain.Place, color: eventDomain.Color);
            await ValidateOverlappingEvents(startTime: eventDomain.StartTime, endTime: eventDomain.EndTime);
            try
            {
                await _eventsRepository.Create(newEvent: eventDomain);
            } catch (Exception ex)
            {
                throw new HandledErrorException("An error occurred while creating the event.", ex);
            }

            return "The event has been successfully created.";
        }

        public async Task<string> UpdateEvent(DTOUpdateEvent updateEvent)
        {
            string eventId = updateEvent.Id;
            if (string.IsNullOrEmpty(eventId))
            {
                throw new UserErrorException("You must enter the id of the event.");
            }
            var eventDomain = CreateDomain(updateEvent);
            await ValidatePlaceAndColor(place: eventDomain.Place, color: eventDomain.Color);
            try
            {
                var resultId = await _eventsRepository.Update(id: eventId, newEvent: eventDomain);
                if(resultId is null)
                {
                    throw new UserErrorException("the event does not exist.");
                }

                return $"The event {resultId} has been successfully updated.";
            }
            catch (Exception ex)
            {
                throw new HandledErrorException("An error occurred while updating the event.", ex);
            }
        }

        public async Task<string> DeleteEvent(string eventId)
        {
            try
            {
                var resultId = await _eventsRepository.Delete(eventId);
                if(resultId is null)
                {
                    throw new UserErrorException("the event does not exist.");
                }

                return $"The event {resultId} has been successfully deleted.";
            }
            catch (Exception ex)
            {
                throw new HandledErrorException("An error occurred while deleting the event.", ex);
            }
        }

        private Event CreateDomain(DTOCreateEvent newEvent)
        {
            var eventDomain = new Event(
                   name: newEvent.Name,
                   description: newEvent.Description,
                   place: newEvent.Place,
                   color: newEvent.Color,
                   date: newEvent.Date,
                   startTime: newEvent.StartTime,
                   endTime: newEvent.EndTime
               );
            return eventDomain;
        }


        private async Task ValidatePlaceAndColor(string place, string color)
        {
            var selectedCity = await _citiesRepository.FindById(place);
            if (selectedCity is null)
            {
                throw new UserErrorException("You must select a valid place.");
            }
            if (!string.IsNullOrEmpty(color))
            {
                var selectedColor = await _colorsRepository.FindById(color);
                if (selectedColor is null)
                {
                    throw new UserErrorException("You must select a valid color.");
                }
            }
        }

        private async Task ValidateOverlappingEvents(DateTime startTime, DateTime endTime)
        {
            var overlappingEvents = await _eventsRepository.FindByDateRangeBetweeenExistingDateRanges(startTime: startTime, endTime: endTime);
            if(overlappingEvents.Count > 0)
            {
                var eventsNames = overlappingEvents.Select(ovlpEvent => ovlpEvent.Name).ToList();
                throw new UserErrorException($"The event time range is overlapping another {overlappingEvents.Count} event(s): {string.Join(", ", eventsNames)}.");
            }
        }
    }
}
