using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;
using LIBRARY.server.Services;
namespace LIBRARY.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class LendingsController : ControllerBase
    {
        private readonly LibraryContext _context;

        

       [HttpPost("nearby")]
public async Task<ActionResult<List<NearbyBookSessionDto>>> GetNearbySessions(
    [FromBody] NearbyBookSessionsRequest request)
{
    var sessions = await _context.BookSession
        .Include(x => x.Collaborator)
        .Where(x => x.BookId == request.BookId && x.Collaborator != null)
        .ToListAsync();

    var result = sessions
        .Select(x => new NearbyBookSessionDto
        {
            BookSessionId = x.Id,
            CollaboratorId = x.CollaboratorId,
            CollaboratorName = x.Collaborator!.Name,
            CollaboratorEmail = x.Collaborator!.Email,
            Lat = x.Collaborator.Latitude,
            Lng = x.Collaborator.Longitude,
            DistanceKm = GetDistanceKm(
                request.UserLat,
                request.UserLng,
                x.Collaborator.Latitude,
                x.Collaborator.Longitude
            )
        })
        .OrderBy(x => x.DistanceKm)
        .ToList();

    return Ok(result);
}

        private double GetDistanceKm(double lat1, double lon1, double lat2, double lon2)
        {
            const double R = 6371;

            var dLat = ToRad(lat2 - lat1);
            var dLon = ToRad(lon2 - lon1);

            var a =
                Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(ToRad(lat1)) *
                Math.Cos(ToRad(lat2)) *
                Math.Sin(dLon / 2) *
                Math.Sin(dLon / 2);

            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            return R * c;
        }

        private double ToRad(double angle) => angle * Math.PI / 180;
      
        private readonly IEmailService _emailService;

        public LendingsController(LibraryContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        [HttpPost("request")]
        public async Task<IActionResult> RequestBorrow(Guid bookId, string requesterName, string requesterEmail)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.BookId == bookId);
            if (book == null)
                return NotFound();

            var owner = await _context.BookSession
                .Include(x => x.Collaborator)
                .FirstOrDefaultAsync(x => x.BookId == bookId);

            if (owner == null)
                return BadRequest();

            await _emailService.SendAsync(
                owner.Collaborator.Email,
                "בקשת השאלה",
                $"{requesterName} רוצה את הספר {book.Name}"
            );

            return Ok();
        }
    }
    }

   

