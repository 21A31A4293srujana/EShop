using MyElectronicsAPI.Models;

namespace MyElectronicsAPI.Helpers
{
    public interface IJwtHelper
    {
        string GenerateToken(User user);
        int? ValidateToken(string token);
    }
} 