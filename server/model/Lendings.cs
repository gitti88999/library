using System.ComponentModel.DataAnnotations;
namespace LIBRARY.Models
{
    public class Lendings
    {
        public Guid Id { get; set; }
        public Guid BorrowerId{ get; set; }
        public Guid BookId{get; set; }
        public DateTime LendingDate{get; set; }
    }
    
}