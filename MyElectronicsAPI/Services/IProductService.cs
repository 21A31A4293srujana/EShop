using System.Collections.Generic;
using System.Threading.Tasks;
using MyElectronicsAPI.DTOs;
using MyElectronicsAPI.Models;

namespace MyElectronicsAPI.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductResponseDto>> GetAllProductsAsync();
        Task<ProductResponseDto> GetProductByIdAsync(int id);
        Task<ProductResponseDto> CreateProductAsync(ProductCreateDto productDto);
        Task<ProductResponseDto> UpdateProductAsync(int id, ProductUpdateDto productDto);
        Task<bool> DeleteProductAsync(int id);
        Task<IEnumerable<ProductResponseDto>> SearchProductsAsync(string searchTerm);
        Task<IEnumerable<ProductResponseDto>> GetProductsByCategoryAsync(string category);
    }
} 