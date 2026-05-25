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
        [HttpPost("book/addBook")]
        public async Task<ActionResult> CreateBook(BookDTO book)
        {
            
            if (string.IsNullOrWhiteSpace(book.Name))
            {
                return BadRequest("The name is required.");
            }
            if (book.Category==0)
            {
                return BadRequest("The Category is required.");
            }
            if (book.AudienceId==0)
            {
                return BadRequest("The Audience is required.");
            }
             if (book.AutherId==0)
            {
                return BadRequest("The Auther is required.");
            }
            // if (_context.Books.Any(b => b.Name == book.Name&&b.AuthorId == book.AuthorId))
            // {
            //     return CreateBookSession();
            //     // return Conflict("A book with the same name already exists.");
            // }
            var newBook = new Book
            {
                BookId = Guid.NewGuid(),
                Name = book.Name,
                Category = book.Category,
                AudienceId = book.AudienceId,
                AutherId = book.AutherId,
            };
            _context.Books.Add(newBook);
            await _context.SaveChangesAsync();
            return Ok(newBook);
        }
    }

}
