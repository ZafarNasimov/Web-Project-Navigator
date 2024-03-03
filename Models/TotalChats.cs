using WebProjectNavigator.Models;
using Newtonsoft.Json;

public class TotalChats : BaseModel
{
    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("request")]
    public Request Request { get; set; }

    [JsonProperty("total")]
    public int Total { get; set; }

    [JsonProperty("records")]
    public Dictionary<string, TotalChatsRecord> Records { get; set; }
}

public class TotalChatsRecord
{
    [JsonProperty("total")]
    public int Total { get; set; }
}
