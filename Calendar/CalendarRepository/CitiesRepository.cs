using CalendarRepository.Models;
using CalendarRepository.Settings;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarRepository
{
    public class CitiesRepository : ICitiesRepository
    {
        private readonly IMongoCollection<CityModel> _cities;
        public CitiesRepository(ICalendarDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _cities = database.GetCollection<CityModel>(settings.CitiesCollectionName);
        }
    }
}
