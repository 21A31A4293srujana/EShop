using System.Collections.Generic;
using System.Threading.Tasks;
using MyElectronicsAPI.DTOs;
using MyElectronicsAPI.Models;

namespace MyElectronicsAPI.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(CreateOrderDto createOrderDto);
        Task<OrderDto> GetOrderByIdAsync(int id);
        Task<IEnumerable<OrderDto>> GetUserOrdersAsync(int userId);
        Task<OrderDto> UpdateOrderStatusAsync(int orderId, UpdateOrderStatusDto updateDto);
        Task<OrderDto> UpdatePaymentStatusAsync(int orderId, UpdatePaymentStatusDto updateDto);
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync();
        Task<IEnumerable<OrderDto>> GetOrdersByUserIdAsync(int userId);
    }
} 