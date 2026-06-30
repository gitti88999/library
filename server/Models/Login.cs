using System.ComponentModel.DataAnnotations;
namespace LIBRARY.Models
{
    public class Login
    {
        public Guid Id{ get; set; }
        public Guid CollaboratorId{ get; set; }
        public Collaborator Collaborator{ get; set; }
        public DateTime LoginDate{ get; set; }
    }
    public class LoginDTO
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }
}