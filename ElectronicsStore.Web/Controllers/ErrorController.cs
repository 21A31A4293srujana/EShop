using Microsoft.AspNetCore.Mvc;

namespace ElectronicsStore.Web.Controllers
{
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [Route("/Error")]
        public IActionResult Error()
        {
            return Problem();
        }
    }
} 