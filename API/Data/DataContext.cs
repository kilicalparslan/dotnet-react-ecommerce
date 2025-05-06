using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{

    public class DataContext(DbContextOptions options) : IdentityDbContext<AppUser, AppRole, string>(options)
    {
        public DbSet<Product> Products => Set<Product>();
        public DbSet<Cart> Carts => Set<Cart>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(new Product
            {
                Id = 1,
                Name = "Product 1",
                Description = "Description 1",
                Price = 10.0m,
                ImageUrl = "1.jpg",
                IsActive = true,
                Stock = 100
            },
            new Product
            {
                Id = 2,
                Name = "Product 2",
                Description = "Description 2",
                Price = 20.0m,
                ImageUrl = "2.jpg",
                IsActive = true,
                Stock = 200
            },
            new Product
            {
                Id = 3,
                Name = "Product 3",
                Description = "Description 3",
                Price = 30.0m,
                ImageUrl = "3.jpg",
                IsActive = true,
                Stock = 300
            },
            new Product
            {
                Id = 4,
                Name = "Product 4",
                Description = "Description 4",
                Price = 40.0m,
                ImageUrl = "4.jpg",
                IsActive = true,
                Stock = 400
            });
        }
    }
}