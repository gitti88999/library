using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
namespace LIBRARY.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CollaboratorController : ControllerBase
    {
        private readonly LibraryContext _context;
        public CollaboratorController(LibraryContext context)
        {
            _context = context;
        }
        // [HttpGet("{id}")]
        // public async Task<ActionResult<Collaborator>> GetBooks(Guid id)
        // {
        //     var Collaborator = await _context.Collaborators.FindAsync(id);

        //     if (Collaborator == null)
        //     {
        //         return NotFound();
        //     }

        //     return Ok(Collaborator);
        // }
        [HttpGet("{collaboratorId}/booksessions")]
        public async Task<IActionResult> GetBookSessionsByCollaborator(Guid collaboratorId)
        {
            var bookSessions = await _context.BookSession
                .Where(bs => bs.CollaboratorId == collaboratorId)
                .Select(bs => new BookSessionWithBookDTO
                {
                    BookSessionId = bs.Id,
                    Enabled = bs.Enabled,
                    Book = new BookDTO
                    {
                        Name = bs.Book.Name,
                        CategoryId = bs.Book.CategoryId,
                        AudienceId = bs.Book.AudienceId,
                        AuthorId = bs.Book.AuthorId
                    }
                })
                .ToListAsync();

            if (!bookSessions.Any())
            {
                var collaboratorExists = await _context.Collaborators
                    .AnyAsync(c => c.CollaboratorId == collaboratorId);

                if (!collaboratorExists)
                {
                    return NotFound($"Collaborator with id {collaboratorId} does not exist.");
                }

                return NotFound($"No book sessions found for collaborator {collaboratorId}.");
            }

            return Ok(bookSessions);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Collaborators.ToListAsync());
        }
// [HttpDelete("delete")]
// public async Task<IActionResult> DeleteUser([FromBody] DeleteUserDto dto)
// {
//     var user = await _context.Collaborators
//         .FirstOrDefaultAsync(x => x.Name == dto.Name);

//     if (user == null)
//         return NotFound("User not found");

//     if (user.Password != dto.Password)
//         return Unauthorized("Invalid credentials");

//     // 1. ארכוב
//     var archived = new ArchivedUser
//     {
//         Name = user.Name,
//         Email = user.Email,
//         Password = user.Password,
//         DeletedAt = DateTime.UtcNow
//     };

//     _context.ArchivedUsers.Add(archived);

//     // 2. מחיקת BookSessions של המשתמש
//     var sessions = _context.BookSession
//         .Where(x => x.CollaboratorId == user.CollaboratorId);

//     _context.BookSession.RemoveRange(sessions);

//     // 3. מחיקת המשתמש
//     _context.Collaborators.Remove(user);

//     await _context.SaveChangesAsync();

//     return Ok("User deleted and archived successfully");
// }
    }
}