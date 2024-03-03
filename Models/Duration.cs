using System.Text.Json.Serialization;
using System.Collections.Specialized;
using Newtonsoft.Json;

namespace WebProjectNavigator.Models
{
    public class Duration : BaseModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("request")]
        public Request Request { get; set; }

        [JsonProperty("total")]
        public int Total { get; set; }

        [JsonProperty("records")]
        public Dictionary<string, Record> Records { get; set; }
    }

    public class Record
    {
        [JsonProperty("agents_chatting_duration")]
        public int agents_chatting_duration { get; set; }

        [JsonProperty("count")]
        public int Count { get; set; }

        [JsonProperty("duration")]
        public int Duration { get; set; }
    }  
}
