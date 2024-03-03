using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WebProjectNavigator.Controllers
{
    [Route("api/Tags")]
    [ApiController]
    public class TagController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetDurationData()
        {
            try
            {
                string jsonFilePath = "./Resources/Tags.json";

                string jsonData = System.IO.File.ReadAllText(jsonFilePath);

                var tagsData = JsonConvert.DeserializeObject<Tag>(jsonData);

                return Ok(tagsData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
