using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyElectronicsAPI.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Street { get; set; }

        [Required]
        [MaxLength(100)]
        public string City { get; set; }

        [Required]
        [MaxLength(50)]
        public string State { get; set; }

        [Required]
        [MaxLength(20)]
        public string PostalCode { get; set; }

        [Required]
        [MaxLength(50)]
        public string Country { get; set; }

        [MaxLength(255)]
        public string AdditionalInfo { get; set; }

        public bool IsDefault { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public virtual User User { get; set; }
        public virtual ICollection<Order> Orders { get; set; }

        public Address()
        {
            CreatedAt = DateTime.UtcNow;
            Orders = new HashSet<Order>();
        }
    }
} 