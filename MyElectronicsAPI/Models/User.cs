using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MyElectronicsAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [MaxLength(100)]
        public string PasswordHash { get; set; }

        [Phone]
        [MaxLength(20)]
        public string PhoneNumber { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Address> Addresses { get; set; }

        public User()
        {
            Orders = new HashSet<Order>();
            Addresses = new HashSet<Address>();
            CreatedAt = DateTime.UtcNow;
        }
    }
} 