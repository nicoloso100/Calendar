using CalendarUtils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalendarApp.Filters
{
    public class ExceptionsFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception is HandledErrorException handledException)
            {
                context.Result = new ContentResult()
                {
                    StatusCode = handledException.StatusCode,
                    Content = handledException.ErrorMessage
                };
                context.ExceptionHandled = true;
            }
            else if (context.Exception is UserErrorException userErrorException)
            {
                context.Result = new ContentResult()
                {
                    StatusCode = userErrorException.StatusCode,
                    Content = userErrorException.ErrorMessage
                };
                context.ExceptionHandled = true;
            }
            else if (context.Exception is Exception exception)
            {
                context.Result = new ContentResult()
                {
                    StatusCode = StatusCodes.Status500InternalServerError,
                    Content = exception.Message
                };
                context.ExceptionHandled = true;
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {

        }
    }
}
