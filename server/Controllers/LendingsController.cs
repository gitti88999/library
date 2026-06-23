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
        private readonly IEmailService _emailService;


         public LendingsController(LibraryContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }
        [HttpPost("nearby")]
        public async Task<IActionResult> GetNearbySessions([FromBody] NearbyBookSessionsRequest request)
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
      

       

       [HttpPost("request")]
public async Task<IActionResult> RequestBorrow([FromBody] BorrowRequestDto request)
{
    var owner = await _context.BookSession
        .Include(x => x.Collaborator)
        .FirstOrDefaultAsync(x => x.Id == request.BookSessionId);

    if (owner == null)
        return BadRequest();

    await _emailService.SendAsync(
        owner.Collaborator.Email,
        "בקשת השאלה",
        $"{request.RequesterName} רוצה את הספר"
    );

    return Ok();
}
    }
    }

   