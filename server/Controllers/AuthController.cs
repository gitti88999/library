using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
using System.Security.Cryptography;
using LIBRARY.server.Services;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Cookies;
namespace LIBRARY.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LibraryContext _context;
        private readonly BookSessionService _bookSessionService;

        private readonly JwtService _jwt;
        public AuthController(LibraryContext context, JwtService jwt,BookSessionService bookSessionService)
        {
            _context = context;
            _jwt = jwt;
             _bookSessionService = bookSessionService;
        }

        // הרשמה
        [HttpPost("register")]
        public async Task<ActionResult> Register(CollaboratorDTO collaborator)
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


            string passwordHash = ComputeSha256Hash(collaborator.Password);

            var newCollaborator = new Collaborator
            {
                CollaboratorId = Guid.NewGuid(),
                Name = collaborator.Name,
                Email = collaborator.Email,
                Password = passwordHash,
                Latitude = collaborator.Latitude,
                Longitude = collaborator.Longitude,
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
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            if (User?.Identity?.IsAuthenticated != true)
                return Unauthorized();

            var userId = User.FindFirst("UserId")?.Value;

            if (userId == null)
                return Unauthorized();

            var guid = Guid.Parse(userId);

            var user = await _context.Collaborators
                .FirstOrDefaultAsync(x => x.CollaboratorId == guid);

            if (user == null)
                return Unauthorized();

            return Ok(new
            {
                collaboratorId = user.CollaboratorId,
                name = user.Name,
                email = user.Email,
                latitude = user.Latitude,
                longitude = user.Longitude
            });
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDTO loginDto)
        {
            if (loginDto == null)
                return BadRequest("Invalid data.");

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
                return Unauthorized("Invalid name or password.");

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, collaborator.Name),
        new Claim("UserId", collaborator.CollaboratorId.ToString())
    };

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);

           try
{
    await HttpContext.SignInAsync(
        CookieAuthenticationDefaults.AuthenticationScheme,
        principal);
}
catch (Exception ex)
{
    return StatusCode(500, ex.Message);
}

            return Ok(new
            {
                collaborator.CollaboratorId,
                collaborator.Name,
                collaborator.Email,
                collaborator.Latitude,
                collaborator.Longitude
            });
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
   
       
        [HttpPut("{id}")]
public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUserDTO dto)
{
    if (dto == null)
        return BadRequest("Invalid data");

    var collaborator = await _context.Collaborators
        .FirstOrDefaultAsync(c => c.CollaboratorId == id);

    if (collaborator == null)
        return NotFound("User not found");

    // בדיקה אם השם כבר קיים אצל מישהו אחר
    var nameExists = await _context.Collaborators
        .AnyAsync(c => c.Name == dto.Name && c.CollaboratorId != id);

    if (nameExists)
        return Conflict("Name already exists");

    collaborator.Name = dto.Name;
    collaborator.Email = dto.Email;
    collaborator.Latitude = dto.Latitude;
    collaborator.Longitude = dto.Longitude;

    await _context.SaveChangesAsync();

    return Ok(new
    {
        collaborator.CollaboratorId,
        collaborator.Name,
        collaborator.Email,
        collaborator.Latitude,
        collaborator.Longitude
    });
}
        [HttpPost("delete")]
public async Task<IActionResult> DeleteUser([FromBody] DeleteUserDto dto)
{
    var user = await _context.Collaborators
    .FirstOrDefaultAsync(x => x.CollaboratorId == dto.CollaboratorId);

    if (user == null)
{
    return NotFound();
}
    // 1. ארכוב
    var archived = new ArchivedUser
    {
        Name = user.Name,
        Email = user.Email,
        Password = user.Password,
        DeletedAt = DateTime.UtcNow
    };

    _context.ArchivedUsers.Add(archived);

    // 2. מחיקת BookSessions של המשתמש
   var sessions = await _context.BookSession
    .Where(x => x.CollaboratorId == user.CollaboratorId)
    .ToListAsync();

foreach (var session in sessions)
{
    await _bookSessionService.ArchiveAndDeleteBookSession(session.Id);
}
    _context.Collaborators.Remove(user);

    await _context.SaveChangesAsync();

    return Ok("User deleted and archived successfully");
}
[HttpGet("reverse-geocode")]
public async Task<IActionResult> ReverseGeocode(double lat, double lon)
{
    var url = $"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}";

    using var client = new HttpClient();
    client.DefaultRequestHeaders.Add("User-Agent", "MyApp");

    var res = await client.GetStringAsync(url);
    return Ok(res);
}
    }
}