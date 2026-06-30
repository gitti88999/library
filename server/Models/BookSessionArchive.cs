namespace LIBRARY.Models
{
    public class BookSessionArchive
    {
        public Guid Id  {get; set;}
        public Guid BookSessionId  {get; set;}
        public Guid BookId  {get; set;}
        public Guid CollaboratorId  {get; set;}
        public bool Enabled  {get; set;}
        public DateTime ArchivedAt {get; set;}
    }
}