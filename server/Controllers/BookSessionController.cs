using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
using System.Net;
using System.Net.Mail;
using LIBRARY.server.Services;

namespace LIBRARY.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookSessionController : ControllerBase
    {
        private readonly BookSessionService _bookSessionService;      
          private readonly LibraryContext _context;
          
       public BookSessionController(LibraryContext context, BookSessionService bookSessionService)
        {
            _context = context;
                _bookSessionService = bookSessionService;

        }
        [HttpPut("{id}")]
        public async Task<ActionResult<BookSession>> PutBookSession(Guid id)
        {
            if (!_context.BookSession.Any(bs => bs.Id == id))
            {
                return BadRequest();
            }
            if (!BookSessionExists(id))
            {
                return NotFound();
            }
            var book = await _context.BookSession.FindAsync(id);
            book.Enabled = !book.Enabled;
          
            _context.Entry(book).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return NoContent();
        }

        private bool BookSessionExists(Guid id)
        {
            return _context.BookSession.Any(b => b.Id == id);
        }

    

    [HttpPost("add-with-session")]
    public async Task<ActionResult> AddBookWithSession(AddBookRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest("Name required");

        // חיפוש ספר קיים
        var existingBook = await _context.Books
            .FirstOrDefaultAsync(b =>
                b.Name == request.Name &&
                b.AuthorId == request.AuthorId);

        Guid bookId;

        if (existingBook == null)
        {
            var newBook = new Book
            {
                BookId = Guid.NewGuid(),
                Name = request.Name,
                CategoryId = request.CategoryId,
                AudienceId = request.AudienceId,
                AuthorId = request.AuthorId
            };

            _context.Books.Add(newBook);
            await _context.SaveChangesAsync();

            bookId = newBook.BookId;
        }
        else
        {
            bookId = existingBook.BookId;
        }

        var existingSession = await _context.BookSession
            .FirstOrDefaultAsync(s =>
                s.BookId == bookId &&
                s.CollaboratorId == request.CollaboratorId);

        if (existingSession != null)
        {
            return BadRequest("הספר כבר קיים אצל המשתמש");
        }

     
        var session = new BookSession
        {
            Id = Guid.NewGuid(),
            BookId = bookId,
            CollaboratorId = request.CollaboratorId,
            Enabled = true
        };

        _context.BookSession.Add(session);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            session.Id,
            session.BookId,
            session.CollaboratorId,
            session.Enabled
        });
    }
       [HttpPut("{id}/archiveAndDelete")]
public async Task<IActionResult> ArchiveAndDeleteBookSession(Guid id)
{
    await _bookSessionService.ArchiveAndDeleteBookSession(id);
    return Ok();
}
    }

}
