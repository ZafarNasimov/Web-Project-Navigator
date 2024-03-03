using System.Text.Json.Serialization;

namespace WebProjectNavigator.Models
{
    public class BaseModel
    {
        public class Request
        {
            [JsonPropertyName("distribution")]
            public string Distribution { get; set; }

            [JsonPropertyName("filters")]
            public Filters Filters { get; set; }
        }

        public class Filters
        {
            [JsonPropertyName("from")]
            public DateTimeOffset From { get; set; }

            [JsonPropertyName("to")]
            public DateTimeOffset To { get; set; }

            [JsonPropertyName("groups")]
            public Groups Groups { get; set; }
        }

        public class Groups
        {
            [JsonPropertyName("values")]
            public List<int> Values { get; set; }
        }
    }
}
