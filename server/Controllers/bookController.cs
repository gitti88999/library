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
        // [HttpPost]
        // public async Task<ActionResult> CreateBook(BookDTO book)
        // {
            
        //     if (string.IsNullOrWhiteSpace(book.Name))
        //     {
        //         return BadRequest("The name is required.");
        //     }
        //     if (book.CategoryId==null)
        //     {
        //         return BadRequest("The Category is required.");
        //     }
        //     if (book.AudienceId==null)
        //     {
        //         return BadRequest("The Audience is required.");
        //     }
        //      if (book.AuthorId==null)
        //     {
        //         return BadRequest("The Author is required.");
        //     }
        //     if (_context.Books.Any(b => b.Name == book.Name&&b.AuthorId == book.AuthorId))
        //     {
        //         // return CreateBookSession();
        //         return Conflict("A book with the same name already exists.");
        //     }
        //     var newBook = new Book
        //     {
        //         BookId = Guid.NewGuid(),
        //         Name = book.Name,
        //         CategoryId = book.CategoryId,
        //         AudienceId = book.AudienceId,
        //         AuthorId = book.AuthorId,
        //     };
        //     _context.Books.Add(newBook);
        //     await _context.SaveChangesAsync();
        //     return Ok(newBook);
        // }
        // [HttpPost("AddOrGetBookSession")]
// public async Task<ActionResult<BookSessionDTO>> AddOrGetBookSession(BookDTO bookDto)
// {
//     if (string.IsNullOrWhiteSpace(bookDto.Name))
//         return BadRequest("Name is required.");

//     if (bookDto.CategoryId == Guid.Empty)
//         return BadRequest("Category is required.");

//     if (bookDto.AudienceId == Guid.Empty)
//         return BadRequest("Audience is required.");

//     if (bookDto.AuthorId == Guid.Empty)
//         return BadRequest("Author is required.");

//     if (request.CollaboratorId == Guid.Empty)
//         return BadRequest("CollaboratorId is required.");

//     // חפש ספר קיים
//     var existingBook = await _context.Books
//         .FirstOrDefaultAsync(b => b.Name == bookDto.Name && b.AuthorId == bookDto.AuthorId);

//     Guid bookId;

//     if (existingBook != null)
//     {
//         bookId = existingBook.BookId;
//     }
//     else
//     {
//         var newBook = new Book
//         {
//             BookId = Guid.NewGuid(),
//             Name = bookDto.Name,
//             CategoryId = bookDto.CategoryId,
//             AudienceId = bookDto.AudienceId,
//             AuthorId = bookDto.AuthorId
//         };

//         _context.Books.Add(newBook);
//         await _context.SaveChangesAsync();

//         bookId = newBook.BookId;
//     }

//     // בדוק אם כבר קיימת BookSession למשתמש
//     var existingSession = await _context.BookSession
//         .FirstOrDefaultAsync(s => s.BookId == bookId && s.CollaboratorId == request.CollaboratorId);

//     if (existingSession != null)
//     {
//         return Ok(new BookSessionDTO
//         {
//             Id = existingSession.Id,
//             Enabled = existingSession.Enabled
//         });
//     }

//     var bookSession = new BookSession
//     {
//         Id = Guid.NewGuid(),
//         BookId = bookId,
//         CollaboratorId = request.CollaboratorId,
//         Enabled = true
//     };

//     _context.BookSession.Add(bookSession);
//     await _context.SaveChangesAsync();

//     return Ok(new BookSessionDTO
//     {
//         Id = bookSession.Id,
//         Enabled = bookSession.Enabled
//     });
// }
        [HttpGet("books")]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _context.Books
                .Select(b => new BookDTO
                {
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
    }

}
