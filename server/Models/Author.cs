using System.ComponentModel.DataAnnotations;

namespace LIBRARY.Models
{
    public class Author
    {
        [Key]
        public Guid Id{get;set;}
       public string Name{get;set;}
       public List<Book> books{get;set;}
    }
}