
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
namespace LIBRARY.Data
{
    
    public class LibraryContext : DbContext
    {

        public DbSet<Book> Books { get; set; }
        public DbSet<Collaborator> Collaborators { get; set; }
        public DbSet<BookSession> BookSession { get; set; }
        public DbSet<Login> Logins { get; set; }
        public DbSet<Audience> Auediences { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<BookSessionArchive> BookSessionArchive { get; set; }
        public DbSet<BookArchive> BookArchive { get; set; }


        public LibraryContext(DbContextOptions<LibraryContext> options)
            : base(options)

        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=db,1433;Database=libraryDB;User Id=SA;Password=ALTgit88999;MultipleActiveResultSets=true;TrustServerCertificate=True;"); // שנה את ה-connection string לפי הצורך
        }
        
        
        
    }
}
