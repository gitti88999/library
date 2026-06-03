using System.ComponentModel.DataAnnotations;

namespace LIBRARY.Models
{
    public class BookArchive
    {
        public Guid Id { get; set; }
        public Guid BookId { get; set; }
        public string Name {get;set;}
        public int Category {get;set;}
        public int AudienceId {get;set;}
        public int AuthorId {get;set;} 
        public DateTime ArchivedAt{get;set;}
    }

}


