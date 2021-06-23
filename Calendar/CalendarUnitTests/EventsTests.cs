using CalendarDomain;
using CalendarDTOs;
using CalendarRepository;
using CalendarServices;
using CalendarUtils;
using NUnit.Framework;
using System;
using System.Globalization;

namespace CalendarUnitTests
{
    public class EventsTests
    {
        private CultureInfo provider = CultureInfo.InvariantCulture;
        private IEventsServices _eventsServices;
        [SetUp]
        public void Setup()
        {
            IEventsRepository _eventsRepository = new FakeRepository();
            ICitiesRepository _citiesRepository = new FakeCitiesRepository();
            IColorsRepository _colorsRepository = new FakeColorsRepository();

            _eventsServices = new EventsServices(
                eventsRepository: _eventsRepository, citiesRepository: _citiesRepository, colorsRepository: _colorsRepository
            );
        }

        [Test]
        public void CreateEvent_AllFields_ReturnEventId()
        {
            var newEvent = GetCompleteEvent();
            var result = _eventsServices.CreateEvent(newEvent).Result;

            Assert.That(result, Is.EqualTo("The event has been successfully created."));
        }

        [Test]
        public void CreateEvent_OnlyRequireFields_ReturnEventId()
        {
            var newEvent = GetCompleteEvent();
            newEvent.Description = null;
            newEvent.Color = null;
            var result = _eventsServices.CreateEvent(newEvent).Result;

            Assert.That(result, Is.EqualTo("The event has been successfully created."));
        }

        [Test]
        public void CreateEvent_InvalidName_ThrowException()
        {
            var newEvent = GetCompleteEvent();
            newEvent.Name = null;
            var ex = Assert.ThrowsAsync<UserErrorException>(async () => await _eventsServices.CreateEvent(newEvent));
            Assert.That(ex.ErrorMessage, Is.EqualTo("You must enter an event name."));
        }

        [Test]
        public void CreateEvent_InvalidPlace_ThrowException()
        {
            var newEvent = GetCompleteEvent();
            newEvent.Place = null;
            var ex = Assert.ThrowsAsync<UserErrorException>(async () => await _eventsServices.CreateEvent(newEvent));
            Assert.That(ex.ErrorMessage, Is.EqualTo("You must enter an event location."));
        }

        [Test]
        public void CreateEvent_InvalidDate_ThrowException()
        {
            var newEvent = GetCompleteEvent();
            newEvent.Date = null;
            var ex = Assert.ThrowsAsync<UserErrorException>(async () => await _eventsServices.CreateEvent(newEvent));
            Assert.That(ex.ErrorMessage, Is.EqualTo("You must enter a date."));
        }

        [Test]
        public void CreateEvent_InvalidStartTime_ThrowException()
        {
            var newEvent = GetCompleteEvent();
            newEvent.StartTime = null;
            var ex = Assert.ThrowsAsync<UserErrorException>(async () => await _eventsServices.CreateEvent(newEvent));
            Assert.That(ex.ErrorMessage, Is.EqualTo("You must enter an event start time."));
        }

        [Test]
        public void CreateEvent_InvalidEndTime_ThrowException()
        {
            var newEvent = GetCompleteEvent();
            newEvent.EndTime = null;
            var ex = Assert.ThrowsAsync<UserErrorException>(async () => await _eventsServices.CreateEvent(newEvent));
            Assert.That(ex.ErrorMessage, Is.EqualTo("You must enter an event end time."));
        }

        [Test]
        public void CreateEvent_InvalidStartWithEndTimes_ThrowException()
        {
            var newEvent = GetCompleteEvent();
            newEvent.Date = CreateDate("06/22/2021");
            newEvent.StartTime = CreateDateTime("2021-06-22 10:00");
            newEvent.EndTime = CreateDateTime("2021-06-22 09:00");
            var ex = Assert.ThrowsAsync<UserErrorException>(async () => await _eventsServices.CreateEvent(newEvent));
            Assert.That(ex.ErrorMessage, Is.EqualTo("The end time cannot be less than the start time."));
        }

        [Test]
        public void CreateEvent_EventBeweenTwoDays_ThrowException()
        {
            var newEvent = GetCompleteEvent();
            newEvent.Date = CreateDate("06/22/2021");
            newEvent.StartTime = CreateDateTime("2021-06-22 10:00");
            newEvent.EndTime = CreateDateTime("2021-06-23 11:00");
            var ex = Assert.ThrowsAsync<UserErrorException>(async () => await _eventsServices.CreateEvent(newEvent));
            Assert.That(ex.ErrorMessage, Is.EqualTo("Events cannot be on two different days."));
        }

        [Test]
        public void CreateEvent_EventOverlappingOneOtherEvent_ThrowException()
        {
            var newEvent = GetCompleteEvent();
            newEvent.Date = CreateDate("06/22/2021");
            newEvent.StartTime = CreateDateTime("2021-06-22 10:30");
            newEvent.EndTime = CreateDateTime("2021-06-22 11:30");
            var ex = Assert.ThrowsAsync<UserErrorException>(async () => await _eventsServices.CreateEvent(newEvent));
            Assert.That(ex.ErrorMessage, Is.EqualTo("The event time range is overlapping another 1 event(s): Test."));
        }

        [Test]
        public void CreateEvent_EventOverlappingTwoOtherEvent_ThrowException()
        {
            var newEvent = GetCompleteEvent();
            newEvent.Date = CreateDate("06/22/2021");
            newEvent.StartTime = CreateDateTime("2021-06-22 10:30");
            newEvent.EndTime = CreateDateTime("2021-06-22 14:30");
            var ex = Assert.ThrowsAsync<UserErrorException>(async () => await _eventsServices.CreateEvent(newEvent));
            Assert.That(ex.ErrorMessage, Is.EqualTo("The event time range is overlapping another 2 event(s): Test, Test 2."));
        }

        private DTOCreateEvent GetCompleteEvent()
        {
            var newEvent = new DTOCreateEvent
            {
                Name = "Test",
                Description = "This is a test",
                Place = "60d2d719577d025c97b039f9",
                Color = "60d2d378166b99f39b00e9de",
                Date = CreateDate("06/21/2021"),
                StartTime = CreateDateTime("2021-06-21 10:30"),
                EndTime = CreateDateTime("2021-06-21 10:30")
            };

            return newEvent;
        }

        private DateTime CreateDate(string date)
        {
            return DateTime.ParseExact(date, "d", provider);
        }

        private DateTime CreateDateTime(string date)
        {
            return DateTime.ParseExact(date, "yyyy-MM-dd HH:mm", provider);
        }
    }
}