 using LIBRARY.Data;
using LIBRARY.Models;
using Microsoft.EntityFrameworkCore;
using LIBRARY.server.Services;

namespace LIBRARY.server.Services
{
    public class BookSessionService
    {
        private readonly LibraryContext _context;

        public BookSessionService(LibraryContext context)
        {
            _context = context;
        }
 public  async Task ArchiveAndDeleteBookSession(Guid id)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var session = await _context.BookSession.FindAsync(id);
                if (session == null)
                   return;
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

         
                _context.BookSession.Remove(session);
await _context.SaveChangesAsync();
              
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

                // return Ok(new
                // {
                //     ArchivedBookSession = sessionArchive,
                //     DeletedBookSessionId = id,
                //     DeletedBookId = deletedBookId
                // });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                // return StatusCode(500, $"Error occurred: {ex.Message}");
            }
        }
    }
}
        