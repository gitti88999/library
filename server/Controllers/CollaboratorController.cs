using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
namespace LIBRARY.AddControllers
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
        [HttpGet("{id}")]
        public async Task<ActionResult<Collaborator>> GetBooks(Guid id)
        {
            var Collaborator = await _context.Collaborator.FindAsync(id);

            if (Collaborator == null)
            {
                return NotFound();
            }

            return Collaborator;
        }
    }
}