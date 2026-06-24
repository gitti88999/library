using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
using System.Security.Cryptography;
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
public IActionResult Me()
{
    if (User?.Identity?.IsAuthenticated != true)
        return Unauthorized();

    var userId = User.FindFirst("UserId")?.Value;
    var name = User.FindFirst(ClaimTypes.Name)?.Value;

    if (userId == null)
        return Unauthorized();

    return Ok(new
    {
        collaboratorId = userId,
        name = name
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

    await HttpContext.SignInAsync(
    CookieAuthenticationDefaults.AuthenticationScheme,
    principal);

    return Ok(new
    {
        collaborator.CollaboratorId,
        collaborator.Name,
        collaborator.Email,
        collaborator.Latitude,
        collaborator.Longitude,

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
        
    }
}