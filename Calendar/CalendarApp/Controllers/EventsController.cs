using CalendarDTOs;
using CalendarServices;
using CalendarUtils;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalendarApp.Controllers
{
    public class EventsController : ControllerBase
    {
        private readonly IEventsServices _eventsServices;
        public EventsController(IEventsServices eventsServices)
        {
            _eventsServices = eventsServices;
        }

        [HttpGet]
        public async Task<DTOResponse> GetEvents()
        {
            var eventsList = await _eventsServices.GetAllEvents();
            return new DTOResponse
            {
                Data = eventsList
            };
        }

        [HttpPost]
        public async Task<DTOResponse> CreateEvent([FromBody] DTOCreateEvent newEvent)
        {
            if (!ModelState.IsValid)
            {
                throw new UserErrorException("The fields are not complete.");
            }

            var result = await _eventsServices.CreateEvent(newEvent);
            return new DTOResponse
            {
                Message = result
            };
        }

        [HttpPut]
        public async Task<DTOResponse> UpdateEvent([FromBody] DTOUpdateEvent newEvent)
        {
            if (!ModelState.IsValid)
            {
                throw new UserErrorException("The fields are not complete.");
            }

            var result = await _eventsServices.UpdateEvent(newEvent);
            return new DTOResponse
            {
                Message = result
            };
        }

        [HttpDelete]
        public async Task<DTOResponse> DeleteEvent([FromQuery] string eventId)
        {
            if (string.IsNullOrEmpty(eventId))
            {
                throw new UserErrorException("The fields are not complete.");
            }

            var result = await _eventsServices.DeleteEvent(eventId);
            return new DTOResponse
            {
                Message = result
            };
        }
    }
}
