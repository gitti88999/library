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
        public async Task<ActionResult<BookSession>> PutBookSession(Guid id,BookSessionDTO BookSession)
        {
            if(id !=BookSession.Id){
                return BadRequest();
            }
            if (!BookSessionExists(id))
            {
                return NotFound();
            }
            var book = await _context.BookSession.FindAsync(id);
              book.Enabled=!BookSession.Enabled;
            // if (book.Enabled == false)
            // {
            //    BookSession.Enabled = true;
            // }
            // else
            // {
            //     BookSession.Enabled = false;
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

         private bool BookSessionExists(Guid id)
         {
            return _context.BookSession.Any(b=> b.Id == id);
         }
         
    }
}