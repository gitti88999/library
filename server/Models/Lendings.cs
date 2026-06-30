using System.ComponentModel.DataAnnotations;
namespace LIBRARY.Models
{
    public class Lendings
    {
        public Guid Id { get; set; }
        public Guid BorrowerId { get; set; }
        public Guid BookSessionId { get; set; }
        public DateTime LendingDate { get; set; }
    }
    public class RequestBorrowDto
    {
        public Guid BookSessionId { get; set; }
        public string RequesterName { get; set; }
        public string RequesterEmail { get; set; }
    }
//     public class GmailSettings
// {
//     public string Email { get; set; } = string.Empty;
//     public string ClientId { get; set; } = string.Empty;
//     public string ClientSecret { get; set; } = string.Empty;
//     public string RefreshToken { get; set; } = string.Empty;
// }
}