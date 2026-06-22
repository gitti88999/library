// using Microsoft.EntityFrameworkCore;
// using LIBRARY.Models;
// using LIBRARY.Data;
// using Microsoft.AspNetCore.Authentication.Cookies;

// var builder = WebApplication.CreateBuilder(args);
// builder.Services.AddDbContext<LibraryContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("libraryDB")));

// builder.Services.AddControllers();

// // Swagger
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
// builder.Services.AddOpenApi();

// // Services
// builder.Services.AddScoped<JwtService>();
// builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
//     .AddCookie(options =>
//     {
//         options.Cookie.Name = "auth";
//         options.Cookie.HttpOnly = true;

//         options.Cookie.SameSite = SameSiteMode.Lax; // או None רק אם HTTPS אמיתי
//         options.Cookie.SecurePolicy = CookieSecurePolicy.None;

//         options.LoginPath = "/api/Auth/login";
//     });
// builder.Services.AddScoped<IEmailService, EmailService>();
// builder.Services.AddAuthorization();
// // CORS
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowFrontend", policy =>
//     {
//         policy
//             .WithOrigins("http://localhost:5173")
//             .AllowAnyHeader()
//             .AllowAnyMethod()
//             .AllowCredentials();
//     });
// });

// var app = builder.Build();
// app.UseRouting();
// app.UseCors("AllowFrontend");
// app.UseAuthentication();
// app.UseAuthorization();
// app.MapGet("/health", () => Results.Ok());
// app.MapControllers();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI(c =>
//     {
//         c.SwaggerEndpoint("/swagger/v1/swagger.json", "Library API V1");
//         c.RoutePrefix = string.Empty;
//     });
// }
// app.UseHttpsRedirection();
// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<LibraryContext>();
//     db.Database.Migrate();
//     DbSeeder.Seed(db);
// }

// app.Run();
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using LIBRARY.Data;
using LIBRARY.server.Services;

var builder = WebApplication.CreateBuilder(args);

// DB
builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("libraryDB")));

// Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOpenApi();

// Services
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<IEmailService, EmailService>();

// Auth (Cookie)
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "auth";
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = SameSiteMode.Lax;
        options.Cookie.SecurePolicy = CookieSecurePolicy.None;
        options.LoginPath = "/api/Auth/login";
         options.Events = new CookieAuthenticationEvents
        {
            OnRedirectToLogin = context =>
            {
                context.Response.StatusCode = 401;
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddAuthorization();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

var app = builder.Build();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGet("/health", () => Results.Ok());

// DB migration + seed עם retry
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<LibraryContext>();

    var retries = 10;
    for (int i = 0; i < retries; i++)
    {
        try
        {
            db.Database.Migrate();
            DbSeeder.Seed(db);
            break;
        }
        catch (SqlException)
        {
            Thread.Sleep(3000);
        }
    }
}

app.Run();