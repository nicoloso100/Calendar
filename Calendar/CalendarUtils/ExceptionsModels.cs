using System;
using Microsoft.AspNetCore.Http;

namespace CalendarUtils
{
    public class HandledErrorException : Exception
    {
        public int StatusCode = StatusCodes.Status500InternalServerError;
        public Exception FullException { get; }
        public string ErrorMessage { get; }

        public HandledErrorException(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }
        public HandledErrorException(string errorMessage, Exception inner)
        {
            FullException = inner;
            ErrorMessage = errorMessage;
        }
    }

    public class UserErrorException : Exception
    {
        public int StatusCode = StatusCodes.Status400BadRequest;
        public string ErrorMessage { get; }

        public UserErrorException(string errorMessage)
        {
            ErrorMessage = errorMessage;
        }
    }
}
