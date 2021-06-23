using CalendarRepository.Models;
using CalendarRepository.Settings;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarRepository.Seeds
{
    public class RunSeeds : IRunSeeds
    {
        private readonly IMongoCollection<ColorModel> _colors;
        private readonly IMongoCollection<CityModel> _cities;
        public RunSeeds(ICalendarDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _colors = database.GetCollection<ColorModel>(settings.ColorsCollectionName);
            _cities = database.GetCollection<CityModel>(settings.CitiesCollectionName);
        }

        public void PopulateDatabase()
        {
            var tasks = new Task[] {
                PopulateColors(),
                PopulateCities()
            };

            Task.WaitAll(tasks);
        }

        private async Task PopulateColors()
        {
            var colorsCount = _colors.EstimatedDocumentCount();
            if (colorsCount <= 0)
            {
                await SeedColors.RunSeed(_colors);
            }
        }

        private async Task PopulateCities()
        {
            var citiesCount = _cities.EstimatedDocumentCount();
            if (citiesCount <= 0)
            {
                await SeedCities.RunSeed(_cities);
            }
        }
    }
}
