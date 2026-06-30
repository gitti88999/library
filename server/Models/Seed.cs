
using LIBRARY.Data;
using Microsoft.EntityFrameworkCore;
namespace LIBRARY.Models
{
    public static class DbSeeder
    {
        public static void Seed(LibraryContext context)
        {
            SeedAudiences(context);
            SeedCategories(context);
            SeedAuthors(context);
        }

        private static void SeedAudiences(LibraryContext context)
        {
            var data = new[]
            {
            "ילדים",
            "נוער",
            "מבוגרים"
        };

            foreach (var name in data)
            {
                if (!context.Audiences.Any(x => x.Name == name))
                {
                    context.Audiences.Add(new Audience
                    {
                        Id = Guid.NewGuid(),
                        Name = name
                    });
                }
            }

            context.SaveChanges();
        }

        private static void SeedCategories(LibraryContext context)
        {
            var data = new[]
            {
            "מתח",
            "הומור",
            "עלילה",
            "מתכונים",
            "קומיקס",
            "לימוד",
            "ידע"
        };

            foreach (var name in data)
            {
                if (!context.Categories.Any(x => x.Name == name))
                {
                    context.Categories.Add(new Category
                    {
                        Id = Guid.NewGuid(),
                        Name = name
                    });
                }
            }

            context.SaveChanges();
        }

        private static void SeedAuthors(LibraryContext context)
        {
            var data = new[]
            {
            "סופר א",
            "סופר ב",
            "סופר ג"
        };

            foreach (var name in data)
            {
                if (!context.Authors.Any(x => x.Name == name))
                {
                    context.Authors.Add(new Author
                    {
                        Id = Guid.NewGuid(),
                        Name = name
                    });
                }
            }

            context.SaveChanges();
        }
    }
}