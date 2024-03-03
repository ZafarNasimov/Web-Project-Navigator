using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WebProjectNavigator.Controllers
{
    [Route("api/TotalChats")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetDurationData()
        {
            try
            {
                string jsonFilePath = "./Resources/TotalChats.json";

                string jsonData = System.IO.File.ReadAllText(jsonFilePath);

                var chatData = JsonConvert.DeserializeObject<TotalChats>(jsonData);

                return Ok(chatData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
