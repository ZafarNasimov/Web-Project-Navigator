using Newtonsoft.Json;
using WebProjectNavigator.Models;

public class Tag : BaseModel
{
    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("request")]
    public Request Request { get; set; }

    [JsonProperty("total")]
    public int Total { get; set; }

    [JsonProperty("records")]
    public Dictionary<string, Dictionary<string, int>> Records { get; set; }
}