using System.ComponentModel.DataAnnotations;

namespace LIBRARY.Models
{
    public class Book{
        [Key]
        public Guid BookId{ get; set; }
        public List<BookSession> bookSessions{get;set;}
        public string Name{ get; set; }
        public int Category{ get; set; }
        public int AudienceId{ get; set; }
        public int AutherId{ get; set; }
    }
}