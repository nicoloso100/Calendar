using CalendarRepository.Models;
using CalendarRepository.Settings;
using MongoDB.Driver;
using System;

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
        }
    }
}
