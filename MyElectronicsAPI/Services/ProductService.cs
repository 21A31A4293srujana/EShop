using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyElectronicsAPI.Data;
using MyElectronicsAPI.DTOs;
using MyElectronicsAPI.Models;

namespace MyElectronicsAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProductResponseDto> CreateProductAsync(ProductCreateDto productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                StockQuantity = productDto.StockQuantity,
                Category = productDto.Category,
                Brand = productDto.Brand,
                Specifications = productDto.Specifications,
                Color = productDto.Color,
                ImageUrl = productDto.ImageUrl,
                CreatedAt = DateTime.UtcNow
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return MapToResponseDto(product);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ProductResponseDto>> GetAllProductsAsync()
        {
            var products = await _context.Products.ToListAsync();
            return products.Select(MapToResponseDto);
        }

        public async Task<ProductResponseDto> GetProductByIdAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return product == null ? null : MapToResponseDto(product);
        }

        public async Task<IEnumerable<ProductResponseDto>> GetProductsByCategoryAsync(string category)
        {
            var products = await _context.Products
                .Where(p => p.Category.ToLower() == category.ToLower())
                .ToListAsync();
            return products.Select(MapToResponseDto);
        }

        public async Task<IEnumerable<ProductResponseDto>> SearchProductsAsync(string searchTerm)
        {
            var searchTermLower = searchTerm.ToLower();
            
            // Search only in name and category fields
            var products = await _context.Products
                .Where(p => p.Name.ToLower().Contains(searchTermLower) ||
                           p.Category.ToLower().Contains(searchTermLower))
                .OrderBy(p => p.Name) // Sort by name for better results
                .ToListAsync();

            return products.Select(MapToResponseDto);
        }

        public async Task<ProductResponseDto> UpdateProductAsync(int id, ProductUpdateDto productDto)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return null;

            product.Name = productDto.Name;
            product.Description = productDto.Description;
            product.Price = productDto.Price;
            product.StockQuantity = productDto.StockQuantity;
            product.Category = productDto.Category;
            product.Brand = productDto.Brand;
            product.Specifications = productDto.Specifications;
            product.Color = productDto.Color;
            product.ImageUrl = productDto.ImageUrl;
            product.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return MapToResponseDto(product);
        }

        private static ProductResponseDto MapToResponseDto(Product product)
        {
            return new ProductResponseDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                StockQuantity = product.StockQuantity,
                Category = product.Category,
                Brand = product.Brand,
                Specifications = product.Specifications,
                Color = product.Color,
                ImageUrl = product.ImageUrl,
                CreatedAt = product.CreatedAt,
                UpdatedAt = product.UpdatedAt
            };
        }
    }
} 