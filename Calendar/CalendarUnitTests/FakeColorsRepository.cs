using CalendarDTOs;
using CalendarRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarUnitTests
{
    public class FakeColorsRepository : IColorsRepository
    {
        List<DTOColor> colors = new List<DTOColor>
        {
            new DTOColor { Id = "60d2d378166b99f39b00e9de", Code = "#FEC5BB" },
            new DTOColor { Id = "60d2d378166b99f39b00e9df", Code = "#FCD5CE" },
            new DTOColor { Id = "60d2d378166b99f39b00e9e0", Code = "#FAE1DD" },
        };

        public Task<List<DTOColor>> FindAll()
        {
            return Task.FromResult(colors);
        }

        public Task<DTOColor> FindById(string id)
        {
            var selectedQuery = colors.Where(color => color.Id.Equals(id));
            var selected = selectedQuery.FirstOrDefault();
            if (selected is not null)
            {
                return Task.FromResult(selected);
            }

            return Task.FromResult<DTOColor>(null);
        }
    }
}
