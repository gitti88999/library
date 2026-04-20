using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

class bookdbcontext:DbContext{
    public bookdbcontext(){}
    public DbSet<Book> books{Get;Set;}
}