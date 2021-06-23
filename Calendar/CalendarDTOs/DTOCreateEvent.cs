using System;
using System.ComponentModel.DataAnnotations;

namespace CalendarDTOs
{
    public class DTOCreateEvent
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public string Place { get; set; }
        public string Color { get; set; }
        [Required]
        public DateTime? Date { get; set; }
        [Required]
        public DateTime? StartTime { get; set; }
        [Required]
        public DateTime? EndTime { get; set; }
    }
}
