using System.ComponentModel.DataAnnotations;
using MyElectronicsAPI.Models;

namespace MyElectronicsAPI.DTOs
{
    public class UpdateOrderStatusDto
    {
        [Required]
        public OrderStatus Status { get; set; }
    }

    public class UpdatePaymentStatusDto
    {
        [Required]
        public PaymentStatus Status { get; set; }
    }
} 