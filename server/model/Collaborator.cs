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
        public int CityId { get; set; }
        public City City { get; set; }
        public string Street { get; set; }
        public int Building { get; set; }
        public int Apartment { get; set; }
        public DateTime AddedDate { get; set; }
    }
    public class CollaboratorDTO
    {
        public string Name { get; set; }
        public string? Password { get; set; }
        [Required]
        public int CityId { get; set; }
        public string Street { get; set; }
        public int Building { get; set; }
        public int Apartment { get; set; }
    }
    public class GoogleLoginDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string GoogleId { get; set; }
    }
}