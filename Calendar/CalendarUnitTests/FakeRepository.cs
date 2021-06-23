using CalendarDomain;
using CalendarDTOs;
using CalendarRepository;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarUnitTests
{
    public class FakeRepository : IEventsRepository
    {
        private CultureInfo provider = CultureInfo.InvariantCulture;
        private string defaultDateFormat = "yyyy-MM-dd HH:mm";

        List<DTOEvent> events = new List<DTOEvent>();

        public FakeRepository()
        {
            events = new List<DTOEvent>
            {
                new DTOEvent
                {
                    Id = "60d2eeff75745e3f7028f2d9",
                    Name= "Test",
                    Description = "This is a test",
                    Color = "60d2d378166b99f39b00e9e2",
                    Place = "60d2d719577d025c97b039fa",
                    Date = DateTime.ParseExact("06/22/2021", "d", provider),
                    StartTime = DateTime.ParseExact("2021-06-22 10:00", defaultDateFormat, provider),
                    EndTime = DateTime.ParseExact("2021-06-22 11:00", defaultDateFormat, provider)
                },
                new DTOEvent
                {
                    Id = "60d2ef8dfa3581f967c51c16",
                    Name= "Test 2",
                    Description = "This is a second test",
                    Color = "60d2d378166b99f39b00e9e2",
                    Place = "60d2d719577d025c97b039fa",
                    Date = DateTime.ParseExact("06/22/2021", "d", provider),
                    StartTime = DateTime.ParseExact("2021-06-22 14:00", defaultDateFormat, provider),
                    EndTime = DateTime.ParseExact("2021-06-22 15:00", defaultDateFormat, provider)
                }
            };
        }

        public Task<string> Create(Event newEvent)
        {
            return Task.FromResult("60d2eeff75745e3f7028f2d9");
        }

        public Task<string> Delete(string id)
        {
            return Task.FromResult(id);
        }

        public Task<List<DTOEvent>> FindAll()
        {
            return Task.FromResult(events);
        }

        public Task<string> Update(string id, Event newEvent)
        {
            return Task.FromResult(id);
        }

        public Task<List<DTOEvent>> FindByDateRangeBetweeenExistingDateRanges(DateTime startTime, DateTime endTime)
        {
            var overlappedEvents = new List<DTOEvent>();
            events.ForEach(selectedEvent =>
            {
                if(startTime < selectedEvent.EndTime && selectedEvent.StartTime < endTime)
                {
                    overlappedEvents.Add(selectedEvent);
                }
            });

            return Task.FromResult(overlappedEvents);
        }
    }
}
