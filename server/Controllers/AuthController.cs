using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
using System.Data.Common;
using System.Security.Cryptography; // עבור SHA256
using System.Text;                  // עבור Encoding
using System.Text;   
namespace LIBRARY.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LibraryContext _context;
        public AuthController(LibraryContext context)
        {
            _context = context;
        }
        
        [HttpPost]
        public async Task<ActionResult<Collaborator>> Register(CollaboratorDTO collaborator)
        {
            if (string.IsNullOrWhiteSpace(collaborator.Name))
            {
                return BadRequest("The name is required.");
            }
            if (_context.Collaborators.Any(c => c.Name == collaborator.Name))
            {
                return Conflict("A collaborator with the same name already exists.");
            }
            // יצירת hash מהסיסמה
            string passwordHash = ComputeSha256Hash(collaborator.Password);
            var newCollaborator = new Collaborator
            {
                CollaboratorId = Guid.NewGuid(),
                Name = collaborator.Name,
                Password = passwordHash, // שמירה כ־hash
                //להוסיף לפי הטבלת נירמול של הערים CityId = CITY[collaborator.CityName],
                Street = collaborator.Street,
                Building = collaborator.Building,
                Apartment = collaborator.Apartment,
                AddedDate = DateTime.UtcNow,
            };
            _context.Collaborators.Add(newCollaborator);
            await _context.SaveChangesAsync();
            return Ok(newCollaborator);
        }
        [HttpPost("login")]
        public async Task<ActionResult<Collaborator>> Login(LoginDTO loginDto)
        {
            if (string.IsNullOrWhiteSpace(loginDto.Name) || string.IsNullOrWhiteSpace(loginDto.Password))
            {
                return BadRequest("Name and password are required.");
            }
string passwordHash = ComputeSha256Hash(loginDto.Password);
            // חיפוש המשתמש בבסיס הנתונים לפי שם וסיסמה
           var collaborator = await _context.Collaborators
                .FirstOrDefaultAsync(c => c.Name == loginDto.Name && c.Password == passwordHash);

            if (collaborator == null)
            {
                return Unauthorized("Invalid name or password.");
            }

            // אפשר להחזיר רק פרטים בסיסיים של המשתמש
            return Ok(new
            {
                collaborator.CollaboratorId,
                collaborator.Name,
                collaborator.Street,
                collaborator.Building,
                collaborator.Apartment,
                collaborator.CityId,
                collaborator.AddedDate
            });
        }
         // פונקציה ליצירת SHA256 hash
        private static string ComputeSha256Hash(string rawData)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                StringBuilder builder = new StringBuilder();
                foreach (var b in bytes)
                    builder.Append(b.ToString("x2"));
                return builder.ToString();
            }
        }
    }

}
