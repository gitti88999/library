
// using Microsoft.EntityFrameworkCore;
// using LIBRARY.Models;
// namespace LIBRARY.Data
// {
// private readonly IEmailService _emailService;

//     public class LibraryContext : DbContext
//     {

//         public DbSet<Book> Books { get; set; }
//         public DbSet<Collaborator> Collaborators { get; set; }
//         public DbSet<BookSession> BookSession { get; set; }
//         public DbSet<Login> Logins { get; set; }
//         public DbSet<Audience> Audiences { get; set; }
//         public DbSet<Author> Authors { get; set; }
//         public DbSet<Category> Categories { get; set; }
//         public DbSet<BookSessionArchive> BookSessionArchive { get; set; }
//         public DbSet<BookArchive> BookArchive { get; set; }

//         public LibraryContext(DbContextOptions<LibraryContext> options)
//             : base(options)

//         {

//         }
//         public LendingsController(IEmailService emailService)
// {
//     _emailService = emailService;
// }
//         protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//         {
//             optionsBuilder.UseSqlServer("Server=db,1433;Database=libraryDB;User Id=SA;Password=ALTgit88999;MultipleActiveResultSets=true;TrustServerCertificate=True;"); // שנה את ה-connection string לפי הצורך
//         }
//         protected override void OnModelCreating(ModelBuilder modelBuilder)
//         {
//             modelBuilder.Entity<Audience>().HasData(
//                 new Audience
//                 {
//                     Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
//                     Name = "ילדים"
//                 },
//                 new Audience
//                 {
//                     Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
//                     Name = "נוער"
//                 },
//                 new Audience
//                 {
//                     Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
//                     Name = "מבוגרים"
//                 }
//             );
//         }
//     }
// }
using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;

namespace LIBRARY.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options)
            : base(options)
        {
        }
        public DbSet<ArchivedUser> ArchivedUsers { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Collaborator> Collaborators { get; set; }
        public DbSet<BookSession> BookSession { get; set; }
        public DbSet<Login> Logins { get; set; }
        public DbSet<Audience> Audiences { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<BookSessionArchive> BookSessionArchive { get; set; }
        public DbSet<BookArchive> BookArchive { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(
                "Host=db.tbqiqjbnbjiogkatqkgs.supabase.co;Port=5432;Database=libraryDB;Username=postgres;Password=ALTgit88999"
            );
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Audience>().HasData(
                new Audience { Id = Guid.Parse("11111111-1111-1111-1111-111111111111"), Name = "ילדים" },
                new Audience { Id = Guid.Parse("22222222-2222-2222-2222-222222222222"), Name = "נוער" },
                new Audience { Id = Guid.Parse("33333333-3333-3333-3333-333333333333"), Name = "מבוגרים" }
            );
        }
    }
}