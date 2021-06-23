using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarRepository.Settings
{
    public class CalendarDatabaseSettings : ICalendarDatabaseSettings
    {
        public string EventsCollectionName { get; set; }
        public string CitiesCollectionName { get; set; }
        public string ColorsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
