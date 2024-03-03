using System.Text.Json.Serialization;
using System.Collections.Specialized;
using WebProjectNavigator.Models;
using Newtonsoft.Json;

public class Rating : BaseModel
{
    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("request")]
    public Request Request { get; set; }

    [JsonProperty("total")]
    public int Total { get; set; }

    [JsonProperty("records")]
    public Dictionary<string, DayRecord> Records { get; set; }
}

public class DayRecord
{
    [JsonProperty("bad")]
    public int? Bad { get; set; }

    [JsonProperty("chats")]
    public int Chats { get; set; }

    [JsonProperty("good")]
    public int? Good { get; set; }
}
