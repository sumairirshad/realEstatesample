using AutoMapper;
using RealStateAPI.DTO;
using RealStateAPI.Models;

namespace RealStateAPI.Mapper
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Users, RegisterDTO>().ReverseMap();
            CreateMap<Properties, PropertyDTO>().ReverseMap();
            CreateMap<Favourites, FavouritesDTO>().ReverseMap();
        }
    }
}
