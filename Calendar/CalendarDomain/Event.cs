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

        public Event(string name, string description, string place, string color, DateTime? date, DateTime? startTime, DateTime? endTime)
        {
            if (string.IsNullOrEmpty(place))
            {
                throw new UserErrorException("You must enter an event location.");
            }

            if (string.IsNullOrEmpty(name))
            {
                throw new UserErrorException("You must enter an event name.");
            }

            this.Name = name;
            this.Description = description;
            this.Place = place;
            this.Color = color;

            if (date is null)
            {
                throw new UserErrorException("You must enter a date.");
            }
            else
            {
                this.Date = (DateTime)date;
            }

            if (startTime is null)
            {
                throw new UserErrorException("You must enter an event start time.");
            }
            else
            {
                this.StartTime = (DateTime)startTime;
            }

            if (endTime is null)
            {
                throw new UserErrorException("You must enter an event end time.");
            }
            else
            {
                this.EndTime = (DateTime)endTime;
            }

            if (EndTime < StartTime)
            {
                throw new UserErrorException("The end time cannot be less than the start time.");
            }

            if((Date - StartTime).Days != 0 || (Date - EndTime).Days != 0 || (EndTime - StartTime).Days != 0)
            {
                throw new UserErrorException("Events cannot be on two different days.");
            }
        }
    }
}
