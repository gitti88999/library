
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;


namespace LIBRARY.Data
{
class LibraryContext:DbContext
{
   
        public DbSet<Book> Book { get; set; }
        public DbSet<Collaborator> Collaborator { get; set; }

        public DbSet<BookSession> BookSession { get; set; }

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
