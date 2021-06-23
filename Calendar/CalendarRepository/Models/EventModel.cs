using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CalendarRepository.Models
{
    public class EventModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("place")]
        [BsonRepresentation(BsonType.ObjectId)]
        public CityModel Place { get; set; }

        [BsonElement("color")]
        [BsonRepresentation(BsonType.ObjectId)]
        public ColorModel Color { get; set; }

        [BsonElement("date")]
        public DateTime Date { get; set; }

        [BsonElement("startTime")]
        public DateTime StartTime { get; set; }

        [BsonElement("endTime")]
        public DateTime EndTime { get; set; }
    }
}
