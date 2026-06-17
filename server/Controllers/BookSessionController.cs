using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
namespace LIBRARY.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookSessionController : ControllerBase
    {
        private readonly LibraryContext _context;
        public BookSessionController(LibraryContext context)
        {
            _context = context;
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

      
//  [HttpGet("search-by-name/{name}")]
// public async Task<IActionResult> SearchByName(string name)
// {
//     var book = await _context.Books
//         .FirstOrDefaultAsync(b => b.Name == name);

//     if (book == null)
//         return NotFound("Book not found");

//     var sessions = await _context.BookSession
//         .Where(s => s.BookId == book.Id)
//         .ToListAsync();

//     return Ok(new
//     {
//         book,
//         sessions
//     });
// }

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

        // בדיקה אם כבר קיימת BookSession עבור אותו משתמש
        var existingSession = await _context.BookSession
            .FirstOrDefaultAsync(s =>
                s.BookId == bookId &&
                s.CollaboratorId == request.CollaboratorId);

        if (existingSession != null)
        {
            return BadRequest("הספר כבר קיים אצל המשתמש");
        }

        // יצירת BookSession חדשה
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
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var session = await _context.BookSession.FindAsync(id);
                if (session == null)
                    return NotFound($"BookSession with id {id} not found.");

                var bookId = session.BookId;

                // --- העברה לארכיון מופעי ספרים ---
                var sessionArchive = new BookSessionArchive
                {
                    Id = Guid.NewGuid(),
                    BookSessionId = session.Id,
                    BookId = session.BookId,
                    CollaboratorId = session.CollaboratorId,
                    Enabled = session.Enabled,
                    ArchivedAt = DateTime.UtcNow
                };
                _context.BookSessionArchive.Add(sessionArchive);

                // מחיקה מהטבלה המקורית
                _context.BookSession.Remove(session);
await _context.SaveChangesAsync();
                // בדיקה אם נותרו מופעים נוספים עבור אותו ספר
                // bool hasOtherSessions = _context.BookSession.Any(s => s.BookId == bookId);
                // Console.WriteLine(hasOtherSessions);
                bool hasOtherSessions = _context.BookSession
                        .AsNoTracking()
                        .Any(s => s.BookId == bookId);
                Guid? deletedBookId = null;

                if (!hasOtherSessions)
                {
                    // אין מופעים נוספים – העברה לארכיון הספרים
                    var book = await _context.Books.FindAsync(bookId);
                    if (book != null)
                    {
                        var bookArchive = new BookArchive
                        {
                            Id = Guid.NewGuid(),
                            BookId = book.BookId,
                            Name = book.Name,
                            CategoryId = book.CategoryId,
                            AudienceId = book.AudienceId,
                            AuthorId = book.AuthorId,
                            ArchivedAt = DateTime.UtcNow
                        };
                        _context.BookArchive.Add(bookArchive);

                        // מחיקה מהטבלה Books
                        _context.Books.Remove(book);
                        await _context.SaveChangesAsync();
                        deletedBookId = bookId;
                    }
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new
                {
                    ArchivedBookSession = sessionArchive,
                    DeletedBookSessionId = id,
                    DeletedBookId = deletedBookId
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, $"Error occurred: {ex.Message}");
            }
        }

    }

}
