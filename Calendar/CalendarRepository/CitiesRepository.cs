using CalendarDTOs;
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

        public async Task<List<DTOCity>> FindAll()
        {
            var citiesQuery = await _cities.FindAsync(city => true);
            var citiesList = citiesQuery.ToEnumerable().Select(city => new DTOCity
            {
                Id = city.Id,
                Name = city.Name
            }).ToList();

            return citiesList;
        }

        public async Task<DTOCity> FindById(string id)
        {
            var cityQuery = await _cities.FindAsync(city => city.Id.Equals(id));
            var cityResult = cityQuery.FirstOrDefault();
            if(cityResult is not null)
            {
                var city = new DTOCity
                {
                    Id = cityResult.Id,
                    Name = cityResult.Name
                };

                return city;
            }

            return null;
        }
    }
}
