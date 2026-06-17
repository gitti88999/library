
using System.ComponentModel.DataAnnotations.Schema;
namespace LIBRARY.Models
{
    public class BookSession{
        public Guid Id{ get; set; }
        [ForeignKey("Book")]
        public Guid BookId{ get; set; }     
        public Book Book{get;set;}
        [ForeignKey("Collaborator")]
        public Guid CollaboratorId{ get; set; } 
        public Collaborator Collaborator{get;set;}
        public bool Enabled{ get; set; }

    }
    public  class BookSessionDTO
    {
         public Guid Id{ get; set; }
        public bool Enabled{ get; set; }
    }
    public class BookSessionWithBookDTO
{
    public Guid BookSessionId { get; set; }
    public bool Enabled { get; set; }
    public BookDTO Book { get; set; }
}
}
public class NearbyBookSessionsRequest
{
    public Guid BookId { get; set; }
    public double UserLat { get; set; }
    public double UserLng { get; set; }
}

public class NearbyBookSessionDto
{
    public Guid BookSessionId { get; set; }
    public Guid CollaboratorId { get; set; }
    public string CollaboratorName { get; set; }
    public double Lat { get; set; }
    public double Lng { get; set; }
    public double DistanceKm { get; set; }
}