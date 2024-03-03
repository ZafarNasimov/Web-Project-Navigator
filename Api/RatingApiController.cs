using Microsoft.AspNetCore.Mvc;
using System.IO;
using Newtonsoft.Json;
using WebProjectNavigator.Models;

namespace WebProjectNavigator.Controllers
{
    [Route("api/Ratings")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetDurationData()
        {
            try
            {
                string jsonFilePath = "./Resources/Ratings.json";

                string jsonData = System.IO.File.ReadAllText(jsonFilePath);

                var ratingData = JsonConvert.DeserializeObject<Rating>(jsonData);

                return Ok(ratingData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
