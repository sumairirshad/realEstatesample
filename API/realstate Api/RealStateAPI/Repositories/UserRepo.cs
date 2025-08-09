using AutoMapper;
using Azure.Core;
using Microsoft.EntityFrameworkCore;
using RealStateAPI.AppVars;
using RealStateAPI.Context;
using RealStateAPI.DTO;
using RealStateAPI.Models;
using RealStateAPI.Repositories.Interface;

namespace RealStateAPI.Repositories
{
    public class UserRepo : IUsers
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UserRepo(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<Users> CreateUser(RegisterDTO dto)
        {
            if (await EmailExistsAsync(dto.Email))
            {
                return null;
            }

            var user = _mapper.Map<Users>(dto);
            user.PasswordHash = ReusableMethods.HashPassword(dto.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<UserLoginResult> GetUserByCredentials(string email, string password)
        {
            var result = new UserLoginResult();

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                result.Code = 1;
                result.Message = "No account found for this email.";
                return result;
            }

            bool isPasswordValid = ReusableMethods.VerifyPassword(user.PasswordHash, password);
            if (!isPasswordValid)
            {
                result.Code = 2;
                result.Message = "Incorrect password.";
                return result;
            }

            result.Code = 3;
            result.Message = "Login successful.";
            result.User = user;

            return result;
        }
    }
}