using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
using System.Security.Cryptography;
using System.Text;

namespace LIBRARY.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly LibraryContext _context;
        private readonly JwtService _jwt;
        public AuthorController(LibraryContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAuthors()
        {
            var authors = await _context.Authors.ToListAsync();
            return Ok(authors);
        }
    }
}