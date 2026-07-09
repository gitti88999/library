using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
using System.ComponentModel;
namespace LIBRARY.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {

        private readonly LibraryContext _context;
        public BookController(LibraryContext context)
        {
            _context = context;
        }
        
        [HttpGet("books")]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _context.Books
                .Select(b => new BookDTO
                {
                    Id = b.BookId,
                    Name = b.Name,
                    CategoryId = b.CategoryId,
                    AudienceId = b.AudienceId,
                    AuthorId = b.AuthorId
                })
                .ToListAsync();

            if (!books.Any())
            {
                return NotFound("No books found.");
            }

            return Ok(books);
        }
        [HttpGet("by-name/{name}")]
        public async Task<IActionResult> GetBookIdByName(string name)
        {
            var book = await _context.Books
                .FirstOrDefaultAsync(b => b.Name == name);

            if (book == null)
                return NotFound();

            return Ok(new { bookId = book.BookId });
        }
    }

}
