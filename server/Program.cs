
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using LIBRARY.Data;
using LIBRARY.server.Services;

AppContext.SetSwitch("System.Net.DisableIPv6", true);
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));
builder.Services.AddScoped<BookSessionService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOpenApi();

builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<IEmailService, EmailService>();

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
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<LibraryContext>();
    db.Database.Migrate();
    DbSeeder.Seed(db);
}
// DB migration + seed עם retry
// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<LibraryContext>();

//     var retries = 10;
//     for (int i = 0; i < retries; i++)
//     {
//         try
//         {
//             db.Database.Migrate();
//             DbSeeder.Seed(db);
//             break;
//         }
//         catch (SqlException)
//         {
//             Thread.Sleep(3000);
//         }
//     }
// }

app.Run();

// using Microsoft.AspNetCore.Authentication.Cookies;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Data.SqlClient;
// using LIBRARY.Data;
// using LIBRARY.server.Services;
// using LIBRARY.Models;
// using System.Net;

// var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddDbContext<LibraryContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("libraryDB")));

// builder.Services.AddScoped<BookSessionService>();
// builder.Services.AddScoped<JwtService>();
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
// builder.Services.AddOpenApi();
// // builder.Services.Configure<GmailSettings>(
// //     builder.Configuration.GetSection("Gmail")
// // );
// // שירותי אפליקציה
// // builder.Services.AddScoped< EmailService>();
// // builder.Services.AddScoped< GoogleOAuthService>();

// // builder.Services.AddScoped<JwtService>();
// // builder.Services.AddScoped< EmailService>();

// ServicePointManager.ServerCertificateValidationCallback += 
//     (sender, cert, chain, sslPolicyErrors) => true;

// builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
//     .AddCookie(options =>
//     {
//         options.Cookie.Name = "auth";
//         options.Cookie.HttpOnly = true;
//         options.Cookie.SameSite = SameSiteMode.Lax;
//         options.Cookie.SecurePolicy = CookieSecurePolicy.None;
//         options.LoginPath = "/api/Auth/login";
//          options.Events = new CookieAuthenticationEvents
//         {
//             OnRedirectToLogin = context =>
//             {
//                 context.Response.StatusCode = 401;
//                 return Task.CompletedTask;
//             }
//         };
//     });

// builder.Services.AddAuthorization();
// AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);
// // CORS
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowFrontend", policy =>
//         policy.WithOrigins("http://localhost:5173")
//               .AllowAnyHeader()
//               .AllowAnyMethod()
//               .AllowCredentials());
// });

// var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseRouting();

// app.UseCors("AllowFrontend");

// app.UseAuthentication();
// app.UseAuthorization();

// app.MapControllers();
// app.MapGet("/health", () => Results.Ok());

// // DB migration + seed עם retry
// using (var scope = app.Services.CreateScope())
// {
//     var db = scope.ServiceProvider.GetRequiredService<LibraryContext>();

//     var retries = 10;
//     for (int i = 0; i < retries; i++)
//     {
//         try
//         {
//             db.Database.Migrate();
//             DbSeeder.Seed(db);
//             break;
//         }
//         catch (SqlException)
//         {
//             Thread.Sleep(3000);
//         }
//     }
// }

// app.Run();

