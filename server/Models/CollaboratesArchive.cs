using System.ComponentModel.DataAnnotations;

namespace LIBRARY.Models
{
public class ArchivedUser
{
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public DateTime DeletedAt { get; set; }
}
public class DeleteUserDto
{
    public Guid CollaboratorId { get; set; }
}
}