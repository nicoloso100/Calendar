using CalendarDTOs;
using CalendarRepository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarRepository
{
    public interface IColorsRepository
    {
        Task<List<DTOColor>> FindAll();
        Task<DTOColor> FindById(string id);
    }
}
