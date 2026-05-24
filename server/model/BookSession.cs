using System.ComponentModel.DataAnnotations;

namespace LIBRARY.Models
{
    public class BookSession{
        public Guid Id{ get; set; }
        public Guid BookId{ get; set; }     
        public Book Book{get;set;}
        public Guid CollaboratorId{ get; set; } 
        public Collaborator Collaborator{get;set;}
        public bool Enabled{ get; set; }

    }
    public  class BookSessionDTO
    {
         public Guid Id{ get; set; }
        public bool Enabled{ get; set; }


    }
}