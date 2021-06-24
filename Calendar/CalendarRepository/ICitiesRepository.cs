using CalendarDTOs;
using CalendarRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarRepository
{
    public interface ICitiesRepository
    {
        Task<List<DTOCity>> FindAll();
        Task<DTOCity> FindById(string id);
    }
}
