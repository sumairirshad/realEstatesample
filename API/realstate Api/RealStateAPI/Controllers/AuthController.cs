using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RealStateAPI.AppVars;
using RealStateAPI.DTO;
using RealStateAPI.Models;
using RealStateAPI.Repositories.Interface;
using System.Net;

namespace RealStateAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUsers _users;
        private readonly IMapper _mapper;
        private readonly IConfiguration _iConfig;

        public AuthController(IUsers users, IMapper mapper, IConfiguration iConfig)
        {
            _users = users;
            _mapper = mapper;
            _iConfig = iConfig;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO dto)
        {
            var response = new APIResponse();

            try
            {
                var user = await _users.CreateUser(dto);

                if (user == null)
                {
                    response.IsSuccess = false;
                    response.ErrorMessages = new List<string> { "Email already exists." };
                    return BadRequest(response);
                }

                response.Result = user;
                response.IsSuccess = true;
                response.Messages = new List<string> { "User registered successfully." };
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.StatusCode = HttpStatusCode.InternalServerError;
                response.ErrorMessages = new List<string> { ex.Message };
                return StatusCode((int)HttpStatusCode.InternalServerError, response);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            var response = new APIResponse();

            try
            {
                var loginResult = await _users.GetUserByCredentials(dto.Email, dto.Password);

                if (loginResult.Code == 1 || loginResult.Code == 2)
                {
                    response.IsSuccess = false;
                    response.Messages = new List<string> { loginResult.Message };
                    return BadRequest(response);
                }

                var user = loginResult.User!;

                var token = ReusableMethods.GenerateJwtToken(
                    userId: user.Id.ToString(),
                    email: user.Email,
                    secretKey: _iConfig["Jwt:Key"],
                    issuer: _iConfig["Jwt:Issuer"],
                    audience: _iConfig["Jwt:Audience"]
                );

                response.IsSuccess = true;
                response.Result = new { Token = token, User = new { user.Id, user.Email } };
                response.Messages = new List<string> { "Login successful." };
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.ErrorMessages = new List<string> { ex.Message };
                response.StatusCode = HttpStatusCode.InternalServerError;
                return StatusCode((int)HttpStatusCode.InternalServerError, response);
            }
        }
    }
}
