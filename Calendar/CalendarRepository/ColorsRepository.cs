using CalendarDTOs;
using CalendarRepository.Models;
using CalendarRepository.Seeds;
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

        public async Task<List<DTOColor>> FindAll()
        {
            var colorsQuery = await _colors.FindAsync(color => true);
            var colorsList = colorsQuery.ToEnumerable().Select(color => new DTOColor
            {
                Id = color.Id,
                Code = color.ColorCode
            }).ToList();

            return colorsList;
        }

        public async Task<DTOColor> FindById(string id)
        {
            var colorQuery = await _colors.FindAsync(color => color.Id.Equals(id));
            var colorResult = colorQuery.FirstOrDefault();
            if (colorResult is not null)
            {
                var color = new DTOColor
                {
                    Id = colorResult.Id,
                    Code = colorResult.ColorCode
                };

                return color;
            }

            return null;
        }
    }
}
