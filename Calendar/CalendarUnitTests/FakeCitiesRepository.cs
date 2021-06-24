using CalendarDTOs;
using CalendarRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarUnitTests
{
    public class FakeCitiesRepository : ICitiesRepository
    {
        List<DTOCity> cities = new List<DTOCity>
        {
            new DTOCity { Id = "60d2d719577d025c97b039f9", Name = "Bogotá" },
            new DTOCity { Id = "60d2d719577d025c97b039fa", Name = "Ibagué" },
            new DTOCity { Id = "60d2d719577d025c97b039fb", Name = "Medellín" },
        };

        public Task<List<DTOCity>> FindAll()
        {
            return Task.FromResult(cities);
        }

        public Task<DTOCity> FindById(string id)
        {
            var resultQuery = cities.Where(city => city.Id.Equals(id));
            var result = resultQuery.FirstOrDefault();
            if(result is not null)
            {
                return Task.FromResult(result);
            }

            return Task.FromResult<DTOCity>(null);
        }
    }
}
