using System.Collections.Generic;

namespace MyElectronicsAPI.DTOs
{
    public class CreateOrderDto
    {
        public int UserId { get; set; }
        public string PaymentMethod { get; set; }
        public ICollection<OrderItemDto> OrderItems { get; set; }
    }
} 