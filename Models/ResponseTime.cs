using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using WebProjectNavigator.Models;

public class ResponseTime : BaseModel
{
    [JsonProperty("name")]
    public string Name { get; set; }

    [JsonProperty("request")]
    public Request Request { get; set; }

    [JsonProperty("total")]
    public int Total { get; set; }

    [JsonProperty("records")]
    public Dictionary<string, ResponseTimeRecord> Records { get; set; }
}

public class ResponseTimeRecord
{
    [JsonProperty("count")]
    public int Count { get; set; }

    [JsonProperty("response_time")]
    public double ResponseTime { get; set; }
}
