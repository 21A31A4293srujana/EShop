using System.ComponentModel.DataAnnotations;

namespace MyElectronicsAPI.DTOs
{
    public class UpdateProductDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int StockQuantity { get; set; }

        [Required]
        [MaxLength(50)]
        public string Category { get; set; }

        [Required]
        [MaxLength(50)]
        public string Brand { get; set; }

        public string Specifications { get; set; }

        [Required]
        [MaxLength(50)]
        public string Color { get; set; }

        [Required]
        public string ImageUrl { get; set; }
    }
} 