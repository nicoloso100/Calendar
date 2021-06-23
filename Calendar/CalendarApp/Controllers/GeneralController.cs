using CalendarDTOs;
using CalendarServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalendarApp.Controllers
{
    public class GeneralController : ControllerBase
    {
        private readonly IGeneralServices _generalServices;
        public GeneralController(IGeneralServices generalServices)
        {
            _generalServices = generalServices;
        }

        [HttpGet]
        public async Task<DTOResponse> GetColors()
        {
            var list = await _generalServices.GetAllColors();
            return new DTOResponse
            {
                Data = list
            };
        }

        [HttpGet]
        public async Task<DTOResponse> GetCities()
        {
            var list = await _generalServices.GetAllCities();
            return new DTOResponse
            {
                Data = list
            };
        }
    }
}
