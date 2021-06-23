using CalendarDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarServices
{
    public interface IEventsServices
    {
        Task<List<DTOEvent>> GetAllEvents();
        Task<string> CreateEvent(DTOCreateEvent newEvent);
        Task<string> UpdateEvent(DTOUpdateEvent newEvent);
        Task<string> DeleteEvent(string eventId);
    }
}
