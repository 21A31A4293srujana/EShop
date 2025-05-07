using System.Threading.Tasks;
using MyElectronicsAPI.DTOs;

namespace MyElectronicsAPI.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto);
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
        Task<UserDto> GetUserProfileAsync(int userId);
        Task<UserDto> UpdateUserProfileAsync(int userId, UpdateProfileDto updateDto);
        Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto);
        Task<UserDto> GetUserByIdAsync(int userId);
    }
} 