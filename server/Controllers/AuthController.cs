using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
using System.Security.Cryptography;
using System.Text;

namespace LIBRARY.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LibraryContext _context;
        private readonly JwtService _jwt;
        public AuthController(LibraryContext context, JwtService jwt)
        {
            _context = context;
            _jwt = jwt;
        }

        // הרשמה
        [HttpPost("register")]
        public async Task<ActionResult> Register( CollaboratorDTO collaborator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool exists = await _context.Collaborators
                .AnyAsync(c => c.Name == collaborator.Name);

            if (exists)
            {
                return Conflict("A collaborator with the same name already exists.");
            }
            var cities = await _context.Cities.ToListAsync();
            bool cityExists = await _context.Cities
                .AnyAsync(c => c.CityId == collaborator.CityId);

            if (!cityExists)
            {
                return BadRequest("Invalid city.");
            }

            string passwordHash = ComputeSha256Hash(collaborator.Password);

            var newCollaborator = new Collaborator
            {
                CollaboratorId = Guid.NewGuid(),
                Name = collaborator.Name,
                Password = passwordHash,
                Street = collaborator.Street,
                Building = collaborator.Building,
                Apartment = collaborator.Apartment,
                CityId = collaborator.CityId,
                AddedDate = DateTime.UtcNow
            };

            _context.Collaborators.Add(newCollaborator);

            await _context.SaveChangesAsync();

            return Ok(newCollaborator);
        }
        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin(GoogleLoginDto dto)
        {
            var user = await _context.Collaborators
                .FirstOrDefaultAsync(x =>
                    x.GoogleId == dto.GoogleId || x.Email == dto.Email);

            if (user == null)
            {
                user = new Collaborator
                {
                    CollaboratorId = Guid.NewGuid(),
                    Name = dto.Name,
                    Email = dto.Email,
                    GoogleId = dto.GoogleId,
                    AddedDate = DateTime.UtcNow
                };

                _context.Collaborators.Add(user);
                await _context.SaveChangesAsync();
            }

            var token = _jwt.GenerateToken(user);

            return Ok(new
            {
                token,
                user
            });
        }
        // התחברות
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDTO loginDto)
        {
            if (loginDto == null)
            {
                return BadRequest("Invalid data.");
            }

            if (string.IsNullOrWhiteSpace(loginDto.Name) ||
                string.IsNullOrWhiteSpace(loginDto.Password))
            {
                return BadRequest("Name and password are required.");
            }

            string passwordHash = ComputeSha256Hash(loginDto.Password);

            var collaborator = await _context.Collaborators
                .FirstOrDefaultAsync(c =>
                    c.Name == loginDto.Name &&
                    c.Password == passwordHash);

            if (collaborator == null)
            {
                return Unauthorized("Invalid name or password.");
            }

            var login = new Login
            {
                Id = Guid.NewGuid(),
                CollaboratorId = collaborator.CollaboratorId,
                LoginDate = DateTime.UtcNow,
            };
            _context.Logins.Add(login);
            await _context.SaveChangesAsync();
            return Ok(login);
        }

        // SHA256 Hash
        private static string ComputeSha256Hash(string rawData)
        {
            using SHA256 sha256Hash = SHA256.Create();

            byte[] bytes = sha256Hash.ComputeHash(
                Encoding.UTF8.GetBytes(rawData)
            );

            StringBuilder builder = new StringBuilder();

            foreach (byte b in bytes)
            {
                builder.Append(b.ToString("x2"));
            }

            return builder.ToString();
        }
    }
}