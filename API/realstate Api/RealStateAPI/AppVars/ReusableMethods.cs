using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RealStateAPI.AppVars
{
    public class ReusableMethods
    {
        private static readonly PasswordHasher<object> _passwordHasher = new();

        public static string HashPassword(string password)
        {
            return _passwordHasher.HashPassword(null!, password);
        }

        public static bool VerifyPassword(string hashedPassword, string inputPassword)
        {
            var result = _passwordHasher.VerifyHashedPassword(null!, hashedPassword, inputPassword);
            return result == PasswordVerificationResult.Success;
        }

        public static string GenerateJwtToken(string userId, string email, string secretKey, string issuer, string audience)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
