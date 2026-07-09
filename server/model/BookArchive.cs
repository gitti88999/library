using System.ComponentModel.DataAnnotations;
using System.Net;

namespace LIBRARY.Models
{
    public class BookArchive
    {
        public Guid Id { get; set; }
        public Guid BookId { get; set; }
        public string Name {get;set;}
        public Guid CategoryId {get;set;}
        public Category category{get;set;}
        public Guid AudienceId {get;set;}
        public Audience audience{get;set;}
        public Guid AuthorId {get;set;} 
        public Author author{get;set;}
        public DateTime ArchivedAt{get;set;}
    }

}


