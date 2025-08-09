using Microsoft.EntityFrameworkCore.Metadata.Internal;
using RealStateAPI.AppVars;
using RealStateAPI.DTO;
using RealStateAPI.Models;

namespace RealStateAPI.Repositories.Interface
{
    public interface IUsers
    {
        Task<Users> CreateUser(RegisterDTO dto);
        Task<bool> EmailExistsAsync(string email);
        Task<UserLoginResult> GetUserByCredentials(string email, string password); 
    }
}
