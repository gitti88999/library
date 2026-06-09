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

        [HttpPost]
        public async Task<ActionResult<BookSession>> CreateBookSession(Guid Bookid, Guid collaborateId)

        {
            if (!_context.Books.Any(c => c.BookId == Bookid))
            {
                return BadRequest("Book id does not exist.");
            }
            if (!_context.Collaborators.Any(c => c.CollaboratorId == collaborateId))

            {
                return BadRequest("collaborateId id does not exist.");
            }
            var newBookSession = new BookSession
            {
                Id = Guid.NewGuid(),
                BookId = Bookid,
                CollaboratorId = collaborateId,
                Enabled = true,

            };
            _context.BookSession.Add(newBookSession);
            await _context.SaveChangesAsync();
            return Ok(newBookSession);



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
