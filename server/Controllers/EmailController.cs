using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
using LIBRARY.server.Services;
namespace LIBRARY.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly LibraryContext _context;
private readonly EmailService _emailService;


 
    
        public EmailController(LibraryContext context,EmailService emailService)
        {
            _context = context;
            _emailService = emailService;

        }
   
        [HttpPost]
    public async Task<IActionResult> Send()
    {
        await _emailService.SendEmailAsync(
            "tichnut78@8547900.org.il",
            "בדיקה",
            "זה עובד עם Gmail OAuth2"
        );
    System.Console.WriteLine("pppppppppppp");
        return Ok();
    }
    
    }
}



