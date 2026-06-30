using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
using LIBRARY.Services;
using System.Security.Cryptography;
using System.Text;

namespace LIBRARY.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AudienceController : ControllerBase
    {
        private readonly LibraryContext _context;
        // private readonly JwtService _jwt;
        public AudienceController(LibraryContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAudiences()
        {
            var audiences = await _context.Audiences.ToListAsync();
            return Ok(audiences);
        }
    }
}