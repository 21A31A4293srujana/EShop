using System.ComponentModel.DataAnnotations;

namespace MyShoesAPI.DTOs
{
    public class CreateProductDto
    {
        [Required]
        [StringLength(100)]
        public required string Name { get; set; }

        [Required]
        public required string Title { get; set; }

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        [Required]
        public required string Description { get; set; }

        public required string ImageUrl { get; set; }

        [Required]
        public required string Category { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int StockQuantity { get; set; }

        public required string Brand { get; set; }
        public required string Size { get; set; }
        public required string Color { get; set; }
    }

    public class UpdateProductDto
    {
        [StringLength(100)]
        public required string Name { get; set; }

        public required string Title { get; set; }

        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }

        public required string Description { get; set; }

        public required string ImageUrl { get; set; }

        public required string Category { get; set; }

        [Range(0, int.MaxValue)]
        public int StockQuantity { get; set; }

        public bool? IsAvailable { get; set; }

        public required string Brand { get; set; }
        public required string Size { get; set; }
        public required string Color { get; set; }
    }

    public class ProductDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public required string Category { get; set; }
        public required string Brand { get; set; }
        public required string Size { get; set; }
        public required string Color { get; set; }
        public required string ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
} 