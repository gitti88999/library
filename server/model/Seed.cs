using LIBRARY.Models;
using LIBRARY.Data;
using Microsoft.EntityFrameworkCore;
public static class DbSeeder
{
    public static void Seed(LibraryContext context)
    {
        // ===== AUDIENCES =====
        if (!context.Audiences.Any())
        {
            var audiences = new List<Audience>
            {
                new Audience { Id = Guid.NewGuid(), Name = "ילדים" },
                new Audience { Id = Guid.NewGuid(), Name = "נוער" },
                new Audience { Id = Guid.NewGuid(), Name = "מבוגרים" }
            };

            context.Audiences.AddRange(audiences);
            context.SaveChanges();
        }

        // ===== CATEGORIES =====
        if (!context.Categories.Any())
        {
            var categories = new List<Category>
            {
                new Category { Id = Guid.NewGuid(), Name = "מתח" },
                new Category { Id = Guid.NewGuid(), Name = "הומור" },
                new Category { Id = Guid.NewGuid(), Name = "עלילה" },
                new Category { Id = Guid.NewGuid(), Name = "מתכונים" },
                new Category { Id = Guid.NewGuid(), Name = "קומיקס" },
                new Category { Id = Guid.NewGuid(), Name = "לימוד" },
                new Category { Id = Guid.NewGuid(), Name = "ידע" }
            };

            context.Categories.AddRange(categories);
            context.SaveChanges();
        }

        // ===== AUTHORS =====
        if (!context.Authors.Any())
        {
            var authors = new List<Author>
            {
                new Author { Id = Guid.NewGuid(), Name = "סופר א" },
                new Author { Id = Guid.NewGuid(), Name = "סופר ב" },
                new Author { Id = Guid.NewGuid(), Name = "סופר ג" }
            };

            context.Authors.AddRange(authors);
            context.SaveChanges();
        }

        
    }
}