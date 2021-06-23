using CalendarRepository.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarRepository.Seeds
{
    public static class SeedCities
    {
        public async static Task RunSeed(IMongoCollection<CityModel> _cities)
        {
            var defaultCities = new List<CityModel> 
            { 
                new CityModel { Name = "Bogotá" },
                new CityModel { Name = "Ibagué" },
                new CityModel { Name = "Medellín" },
                new CityModel { Name = "Pereira" },
                new CityModel { Name = "Cali" },
            };

            await _cities.InsertManyAsync(defaultCities);
        }
    }
}
