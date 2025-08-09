using AutoMapper;
using Microsoft.AspNetCore.Http;
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
    public class HomeController : ControllerBase
    {
        private readonly IProperties _iProperties;
        private readonly IFavourites _iFav;

        public HomeController(IProperties properties, IFavourites iFav)
        {
            _iProperties = properties;
            _iFav = iFav;
        }

        [HttpPost("insertProperty")]
        public async Task<IActionResult> SaveProperty(PropertyDTO dto)
        {
            var response = new APIResponse();

            try
            {
                var result = await _iProperties.InsertProperty(dto);

                response.Result = result;
                response.IsSuccess = true;
                response.Messages = new List<string> { "Successfully listed your property!" };
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

        [HttpPost("fetchProperties")]
        public async Task<IActionResult> FetchProperties(int userId)
        {
            var response = new APIResponse();

            try
            {
                var result = await _iProperties.FetchProperties(userId);

                response.Result = result;
                response.IsSuccess = true;
                response.Messages = new List<string> { "Successfully get!" };
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

        [HttpPost("saveFavourites")]
        public async Task<IActionResult> SaveFavourites(FavouritesDTO dto)
        {
            var response = new APIResponse();

            try
            {
                var (result, isAdded) = await _iFav.SaveFavourit(dto);

                response.Result = result;
                response.IsSuccess = true;
                response.Messages = new List<string>
                {
                    isAdded ? "Property saved! View it in your favourites." : "Property removed from your favourites."
                };
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

        [HttpPost("fetchIsPropertyFavourited")]
        public async Task<IActionResult> CheckIsFavourited(int userId)
        {
            var response = new APIResponse();

            try
            {
                var result = await _iFav.FetchFavouritedProperties(userId);

                response.Result = result;
                response.IsSuccess = true;
                response.Messages = new List<string> { "success" };
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
    }
}
