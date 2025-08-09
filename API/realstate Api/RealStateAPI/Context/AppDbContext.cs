using Microsoft.EntityFrameworkCore;
using RealStateAPI.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace RealStateAPI.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }
        public DbSet<Properties> Properties { get; set; }
        public DbSet<Favourites> Favourites { get; set; }
    }
}
