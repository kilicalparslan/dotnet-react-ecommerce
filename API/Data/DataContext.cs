namespace API.Data
{
    using API.Entity;
    using Microsoft.EntityFrameworkCore;

    public class DataContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Product> Products => Set<Product>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(new Product
            {
                Id = 1,
                Name = "Product 1",
                Description = "Description 1",
                Price = 10.0m,
                ImageUrl = "https://example.com/image1.jpg",
                IsActive = true,
                Stock = 100
            },
            new Product
            {
                Id = 2,
                Name = "Product 2",
                Description = "Description 2",
                Price = 20.0m,
                ImageUrl = "https://example.com/image2.jpg",
                IsActive = true,
                Stock = 200
            },
            new Product
            {
                Id = 3,
                Name = "Product 3",
                Description = "Description 3",
                Price = 30.0m,
                ImageUrl = "https://example.com/image3.jpg",
                IsActive = true,
                Stock = 300
            });
        }
    }
}