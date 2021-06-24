using CalendarDomain;
using CalendarDTOs;
using CalendarRepository.Models;
using CalendarRepository.Settings;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalendarRepository
{
    public class EventsRepository : IEventsRepository
    {
        private readonly IMongoCollection<EventModel> _events;

        public EventsRepository(ICalendarDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _events = database.GetCollection<EventModel>(settings.EventsCollectionName);
            _events = database.GetCollection<EventModel>(settings.EventsCollectionName);
            _events = database.GetCollection<EventModel>(settings.EventsCollectionName);
        }

        public async Task<List<DTOEvent>> FindAll()
        {
            var eventsQuery = await _events.FindAsync(events => true);
            var eventsList = eventsQuery.ToEnumerable().Select(selectedEvent => MapEventModelToDTO(selectedEvent)).ToList();

            return eventsList;
        }

        public async Task<string> Create(Event newEvent)
        {
            var eventMongo = new EventModel
            {
                Name = newEvent.Name,
                Description = newEvent.Description,
                Place = newEvent.Place,
                Color = newEvent.Color,
                Date = newEvent.Date,
                StartTime = newEvent.StartTime,
                EndTime = newEvent.EndTime
            };

            await _events.InsertOneAsync(eventMongo);

            return eventMongo.Id;
        }

        public async Task<string> Update(string id, Event newEvent)
        {
            var eventQuery = await _events.FindAsync(selectedEvent => selectedEvent.Id.Equals(id));
            var eventMongo = eventQuery.FirstOrDefault();
            if (eventMongo is not null)
            {
                eventMongo.Name = newEvent.Name;
                eventMongo.Description = newEvent.Description;
                eventMongo.Place = newEvent.Place;
                eventMongo.Color = newEvent.Color;
                eventMongo.Date = newEvent.Date;
                eventMongo.StartTime = newEvent.StartTime;
                eventMongo.EndTime = newEvent.EndTime;

                await _events.ReplaceOneAsync(selectedEvent => selectedEvent.Id.Equals(id), eventMongo);

                return eventMongo.Id;
            }

            return null;
        }

        public async Task<string> Delete(string id)
        {
            var eventQuery = await _events.FindAsync(selectedEvent => selectedEvent.Id.Equals(id));
            var eventMongo = eventQuery.FirstOrDefault();
            if (eventMongo is not null)
            {
                await _events.DeleteOneAsync(selectedEvent => selectedEvent.Id.Equals(id));
                return eventMongo.Id;
            }

            return null;
        }

        public async Task<List<DTOEvent>> FindByDateRangeBetweeenExistingDateRanges(DateTime startTime, DateTime endTime)
        {
            var pipeline = new BsonDocument[]
            {
                new BsonDocument("$match",
                new BsonDocument("$or",
                new BsonArray {
                    new BsonDocument {{ "startTime", new BsonDocument("$lte", startTime) },{ "endTime", new BsonDocument("$gte", startTime) }},
                    new BsonDocument {{ "startTime", new BsonDocument("$lte", endTime) },{ "endTime", new BsonDocument("$gte", endTime) }},
                    new BsonDocument {{ "startTime", new BsonDocument("$gt", startTime) },{ "endTime", new BsonDocument("$lt", endTime) }}
                }))
            };

            var existingEventsQuery = await _events.AggregateAsync<EventModel>(pipeline);
            var existingEvents = existingEventsQuery.ToEnumerable().Select(existingEvent => MapEventModelToDTO(existingEvent)).ToList();

            return existingEvents;
        }

        private DTOEvent MapEventModelToDTO(EventModel selectedEvent)
        {
            var dto = new DTOEvent
            {
                Id = selectedEvent.Id,
                Name = selectedEvent.Name,
                Description = selectedEvent.Description,
                Place = new DTOCity { Id = selectedEvent.Place },
                Color = new DTOColor { Id = selectedEvent.Color },
                Date = selectedEvent.Date,
                StartTime = selectedEvent.StartTime,
                EndTime = selectedEvent.EndTime
            };

            return dto;
        }
    }
}
