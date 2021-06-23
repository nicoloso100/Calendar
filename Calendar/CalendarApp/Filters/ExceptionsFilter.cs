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
        private readonly ILogger _logger;

        public ExceptionsFilter(ILogger logger)
        {
            _logger = logger;
        }
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
                if(handledException.FullException is not null)
                {
                    _logger.LogError(handledException.FullException.StackTrace);
                }
            }
            else if (context.Exception is UserErrorException userErrorException)
            {
                context.Result = new ContentResult()
                {
                    StatusCode = userErrorException.StatusCode,
                    Content = userErrorException.Message
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
                _logger.LogError(exception.StackTrace);
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {

        }
    }
}
