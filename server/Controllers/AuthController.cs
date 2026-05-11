using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
using System.Data.Common;
namespace LIBRARY.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController: ControllerBase
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
            var newCollaborator = new Collaborator
            {
                CollaboratorId = Guid.NewGuid(),
                Name = collaborator.Name,
                Password = collaborator.Password,
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
        // public async Task<ActionResult<Collaborator>> Login(string username, string password)
        // {
        //     if (string.IsNullOrWhiteSpace(username))
        //     {
        //         return BadRequest("The username is required.");
        //     }
        //     if (string.IsNullOrWhiteSpace(password))
        //     {
        //         return BadRequest("The password is required.");
        //     }
        //     if (_context.Collaborators.Any(c => c.Name != username || c.Password != password))
        //     {
        //         return Conflict("A collaborator with this name or password not exists.");
        //     }

        //     var nc = _context.Collaborators.Any(c => c.Name == username && c.Password == password);
        //     var login = new Login
        //     {
        //         Id = Guid.NewGuid(),
        //         CollaboratorId = nc.Id,
        //         LoginDate = DateTime.UtcNow
        //     };
        //     _context.Logins.Add(login);
        //     await _context.SaveChangesAsync();
        //     return Ok();
        // }
        //     var newCollaborator = new Collaborator
        //     {
        //         CollaboratorId = Guid.NewGuid(),
        //         Name = collaborator.Name,
        //         Password = collaborator.Password,
        //         //להוסיף לפי הטבלת נירמול של הערים CityId = CITY[collaborator.CityName],
        //         Street = collaborator.Street,
        //         Building = collaborator.Building,
        //         Apartment = collaborator.Apartment,
        //         AddedDate = DateTime.UtcNow,
        //     };
        //     _context.Collaborator.Add(newCollaborator);
        //     await _context.SaveChangesAsync();
        //     return Ok(newCollaborator);
        // }
    }
}