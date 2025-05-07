using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyElectronicsAPI.Models;

namespace MyElectronicsAPI.Data
{
    public static class DataSeeder
    {
        public static async Task SeedProducts(ApplicationDbContext context)
        {
            // Check if products already exist
            if (await context.Products.AnyAsync())
            {
                return; // Database has already been seeded
            }

            // Create sample products
            var products = new List<Product>
            {
                new Product
                {
                    Name = "Wireless Headphones",
                    Description = "High-quality wireless headphones with noise cancellation",
                    Price = 199.99m,
                    StockQuantity = 50,
                    Category = "Audio",
                    Brand = "SoundMaster",
                    Specifications = "Bluetooth 5.0, 30-hour battery life",
                    Color = "Black",
                    ImageUrl = "https://example.com/headphones.jpg",
                    CreatedAt = DateTime.UtcNow
                },
                new Product
                {
                    Name = "Smart Watch",
                    Description = "Feature-rich smartwatch with health monitoring",
                    Price = 299.99m,
                    StockQuantity = 30,
                    Category = "Wearables",
                    Brand = "TechWear",
                    Specifications = "Heart rate monitor, GPS, Water resistant",
                    Color = "Silver",
                    ImageUrl = "https://example.com/smartwatch.jpg",
                    CreatedAt = DateTime.UtcNow
                },
                new Product
                {
                    Name = "Wireless Earbuds",
                    Description = "True wireless earbuds with premium sound",
                    Price = 149.99m,
                    StockQuantity = 75,
                    Category = "Audio",
                    Brand = "SoundMaster",
                    Specifications = "Bluetooth 5.2, 8-hour battery life",
                    Color = "White",
                    ImageUrl = "https://example.com/earbuds.jpg",
                    CreatedAt = DateTime.UtcNow
                },
                new Product
                {
                    Name = "Fitness Tracker",
                    Description = "Advanced fitness tracker with sleep monitoring",
                    Price = 89.99m,
                    StockQuantity = 100,
                    Category = "Wearables",
                    Brand = "TechWear",
                    Specifications = "Step counter, Sleep tracker, Water resistant",
                    Color = "Blue",
                    ImageUrl = "https://example.com/fitnesstracker.jpg",
                    CreatedAt = DateTime.UtcNow
                },
                new Product
                {
                    Name = "Bluetooth Speaker",
                    Description = "Portable Bluetooth speaker with premium sound",
                    Price = 129.99m,
                    StockQuantity = 40,
                    Category = "Audio",
                    Brand = "SoundMaster",
                    Specifications = "20W output, 12-hour battery life",
                    Color = "Red",
                    ImageUrl = "https://example.com/speaker.jpg",
                    CreatedAt = DateTime.UtcNow
                }
            };

            // Add products to the database
            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();

            Console.WriteLine("Sample electronics products seeded successfully!");
        }
    }
} 