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
    public class CategoryController : ControllerBase
    {
        private readonly LibraryContext _context;
        // private readonly JwtService _jwt;
        public CategoryController(LibraryContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetCategorys()
        {
            var categorys = await _context.Categories.ToListAsync();
            return Ok(categorys);
        }
    }
}