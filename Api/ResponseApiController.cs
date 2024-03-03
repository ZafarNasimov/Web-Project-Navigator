using Microsoft.AspNetCore.Mvc;
using System.IO;
using Newtonsoft.Json;
using WebProjectNavigator.Models;

namespace WebProjectNavigator.Controllers
{
    [Route("api/ResponseTime")]
    [ApiController]
    public class ResponseController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetDurationData()
        {
            try
            {
                string jsonFilePath = "./Resources/ResponseTime.json";

                string jsonData = System.IO.File.ReadAllText(jsonFilePath);

                var responseData = JsonConvert.DeserializeObject<ResponseTime>(jsonData);

                return Ok(responseData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
