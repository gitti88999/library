using System.ComponentModel.DataAnnotations;

namespace LIBRARY.Models
{
    public class Book{
        [Key]
        public Guid BookId{ get; set; }
        public List<BookSession> bookSessions{get;set;}
        public string Name{ get; set; }
        public int Category{ get; set; }
        public Guid AudienceId { get; set; }
        public Audience Audience { get; set; }
        public int AuthorId{ get; set; }
    }
     public  class BookDTO
    {
       public string Name{ get; set; }
        public int Category{ get; set; }
        public Guid AudienceId { get; set; }
        public int AuthorId{ get; set; }



    }
}