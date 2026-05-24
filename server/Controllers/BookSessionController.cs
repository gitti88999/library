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
public async Task<ActionResult> PutBookSession(Guid id)
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
// if (book.Enabled == false)
// {
// BookSession.Enabled = true;
// }
// else
// {
// BookSession.Enabled = false;
// }
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
[HttpPut("{id}")]
         private bool BookSessionExists(Guid id)
         {
            return _context.BookSession.Any(b=> b.Id == id);
         }
         
         [HttpPost]
         public async Task<ActionResult<BookSession>> CreateBookSession(Guid Bookid,Guid collaborateId )
         
        {
            if (!_context.Books.Any(c => c.BookId==Bookid))
            {
                return Conflict("Book id does not exist.");
            }
             if (!_context.Collaborators.Any(c => c.CollaboratorId==collaborateId))

            {
                return Conflict("collaborateId id does not exist.");
            }
            var newBookSession=new BookSession
            {
                Id=Guid.NewGuid(),
                BookId=Bookid,
                CollaboratorId=collaborateId,
                Enabled=true,
               
            };
            _context.BookSession.Add(newBookSession);
            await _context.SaveChangesAsync();
            return Ok(newBookSession);
        
       
       
        }
    }
}