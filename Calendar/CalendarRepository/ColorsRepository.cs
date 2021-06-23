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
    public class ColorsRepository: IColorsRepository
    {
        private readonly IMongoCollection<ColorModel> _colors;
        public ColorsRepository(ICalendarDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _colors = database.GetCollection<ColorModel>(settings.ColorsCollectionName);
        }
    }
}
