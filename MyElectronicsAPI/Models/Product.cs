using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyElectronicsAPI.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        
        [Required]
        [MaxLength(500)]
        public string Description { get; set; }
        
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        
        [Required]
        public int StockQuantity { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Category { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Brand { get; set; }
        
        [Required]
        [MaxLength(500)]
        public string Specifications { get; set; }
        
        [Required]
        [MaxLength(50)]
        public string Color { get; set; }
        
        [Required]
        [MaxLength(255)]
        public string ImageUrl { get; set; }
        
        public int Quantity { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation property
        public virtual ICollection<OrderItem> OrderItems { get; set; }

        public Product()
        {
            OrderItems = new HashSet<OrderItem>();
        }
    }
} 