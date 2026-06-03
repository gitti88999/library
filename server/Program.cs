// using Microsoft.EntityFrameworkCore;
// using LIBRARY.Models;
// using LIBRARY.Data;

// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.
// // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddDbContext<LibraryContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("libraryDB")));
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();
// builder.Services.AddScoped<JwtService>();
// builder.Services.AddOpenApi();

// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowFrontend",
//         policy =>
//         {
//             policy
//                 .WithOrigins("http://localhost:5173")
//                 .AllowAnyHeader()
//                 .AllowAnyMethod();
//         });
// });

// // builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
// //     .AddJwtBearer(options =>
// //     {
// //         options.TokenValidationParameters = new TokenValidationParameters
// //         {
// //             // Validate that the token is signed with the specified key
// //             ValidateIssuerSigningKey = true,
// //             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:SecretKey"])),

// //             // Disable issuer and audience validation for testing purposes
// //             ValidateIssuer = false,
// //             ValidateAudience = false
// //         };
// //     });

// var app = builder.Build();
// app.MapGet("/health", () => Results.Ok());
// app.UseCors("AllowFrontend");

// app.MapControllers();
// // Configure the middleware pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI(c=>
//     {
//         c.SwaggerEndpoint("/swagger/v1/swagger.json", "Library API V1");
//         c.RoutePrefix = string.Empty; 
//     });
// }

// app.UseHttpsRedirection();
// app.UseAuthentication();
// app.UseAuthorization();
// app.MapControllers();


// app.Run();

using Microsoft.EntityFrameworkCore;
using LIBRARY.Models;
using LIBRARY.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<LibraryContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("libraryDB")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<JwtService>();
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

app.MapGet("/health", () => Results.Ok());
app.UseCors("AllowFrontend");

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Library API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


// ✅ כאן המיגרציות
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<LibraryContext>();
    db.Database.Migrate();
}

app.Run();