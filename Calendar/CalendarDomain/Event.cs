using CalendarUtils;
using System;

namespace CalendarDomain
{
    public class Event
    {
        public string Name { get; }
        public string Description { get; }
        public string Place { get; }
        public string Color { get; }
        public DateTime Date { get; }
        public DateTime StartTime { get; }
        public DateTime EndTime { get; }

        public Event(string name, string description, string place, string color, DateTime date, DateTime startTime, DateTime endTime)
        {
            if(endTime < startTime)
            {
                throw new UserErrorException("The end time cannot be less than the start time.");
            }

            if (string.IsNullOrEmpty(name))
            {
                throw new UserErrorException("You must enter an event name.");
            }

            if (string.IsNullOrEmpty(place))
            {
                throw new UserErrorException("You must enter an event location.");
            }

            this.Name = name;
            this.Description = description;
            this.Place = place;
            this.Color = color;
            this.Date = date;
            this.StartTime = startTime;
            this.EndTime = endTime;
        }
    }
}
