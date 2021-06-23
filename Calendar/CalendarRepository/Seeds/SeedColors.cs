using CalendarRepository.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarRepository.Seeds
{
    public static class SeedColors
    {
        public async static Task RunSeed(IMongoCollection<ColorModel> _colors)
        {
            var defaultColors = new List<ColorModel>()
            {
                new ColorModel{ColorCode = "#FEC5BB"},
                new ColorModel{ColorCode = "#FCD5CE"},
                new ColorModel{ColorCode = "#FAE1DD"},
                new ColorModel{ColorCode = "#F8EDEB"},
                new ColorModel{ColorCode = "#E8E8E4"},
                new ColorModel{ColorCode = "#D8E2DC"},
                new ColorModel{ColorCode = "#ECE4DB"},
                new ColorModel{ColorCode = "#FFE5D9"},
                new ColorModel{ColorCode = "#FFD7BA"},
                new ColorModel{ColorCode = "#FEC89A"},
            };

            await _colors.InsertManyAsync(defaultColors);
        }
    }
}
