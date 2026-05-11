
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
namespace LIBRARY.Data
{
public class LibraryContext:DbContext
{
   
        public DbSet<Book> Books { get; set; }
        public DbSet<Collaborator> Collaborators { get; set; }

        public DbSet<BookSession> BookSession { get; set; }
        // public DBSet<Login> Logins{ get; set; }

        public LibraryContext(DbContextOptions<LibraryContext> options)
            : base(options)

            {

            }
            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost, 1434;Database=libraryDB;User Id=SA;Password=altGIT88999;MultipleActiveResultSets=true;TrustServerCertificate=True;"); // שנה את ה-connection string לפי הצורך
        }

    }
}
