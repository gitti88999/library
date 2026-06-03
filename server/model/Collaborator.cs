using System.ComponentModel.DataAnnotations;

namespace LIBRARY.Models
{
    public class Collaborator
    {
        [Key]
        public Guid CollaboratorId { get; set; }
        public List<BookSession> bookSessions { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? GoogleId { get; set; }
        public string Password { get; set; }
      
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime AddedDate { get; set; }
    }
    public class CollaboratorDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string? Password { get; set; }
        [Required]
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        
    }
    public class GoogleLoginDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string GoogleId { get; set; }
    }
}