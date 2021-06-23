using CalendarDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarServices
{
    public interface IGeneralServices
    {
        Task<List<DTOColor>> GetAllColors();
        Task<List<DTOCity>> GetAllCities();
    }
}
