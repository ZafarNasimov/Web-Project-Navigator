using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebProjectNavigator.Models;

namespace WebProjectNavigator.Controllers
{
    [Route("api/Duration")]
    [ApiController]
    public class DurationController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetDurationData()
        {
            try
            {
                string jsonFilePath = "./Resources/Duration.json";

                string jsonData = System.IO.File.ReadAllText(jsonFilePath);

                var durationData = JsonConvert.DeserializeObject<Duration>(jsonData);

                return Ok(durationData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
