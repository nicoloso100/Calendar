using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarRepository.Settings
{
    public interface ICalendarDatabaseSettings
    {
        string EventsCollectionName { get; set; }
        string CitiesCollectionName { get; set; }
        string ColorsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
