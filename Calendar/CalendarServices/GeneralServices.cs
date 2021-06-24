using CalendarDTOs;
using CalendarRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarServices
{
    public class GeneralServices : IGeneralServices
    {
        private readonly IColorsRepository _colorsRepository;
        private readonly ICitiesRepository _citiesRepository;
        public GeneralServices(IColorsRepository colorsRepository, ICitiesRepository citiesRepository)
        {
            _colorsRepository = colorsRepository;
            _citiesRepository = citiesRepository;
        }

        public async Task<List<DTOColor>> GetAllColors()
        {
            var colors = await _colorsRepository.FindAll();

            return colors;
        }


        public async Task<List<DTOCity>> GetAllCities()
        {
            var cities = await _citiesRepository.FindAll();

            return cities;
        }
    }
}
