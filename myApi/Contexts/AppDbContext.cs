using Microsoft.EntityFrameworkCore;
using myApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace myApi.Contexts
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {

        }

        public DbSet<Country> country { get; set; }
        public DbSet<Users> users { get; set; }
        public DbSet<Galery> galery { get; set; }
    }
}
