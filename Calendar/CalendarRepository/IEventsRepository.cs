using CalendarDomain;
using CalendarDTOs;
using CalendarRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarRepository
{
    public interface IEventsRepository
    {
        Task<List<DTOEvent>> FindAll();
        Task<string> Create(Event newEvent);
        Task<string> Update(string id, Event newEvent);
        Task<string> Delete(string id);
        Task<List<DTOEvent>> FindByDateRangeBetweeenExistingDateRanges(DateTime startTime, DateTime endTime);
    }
}
