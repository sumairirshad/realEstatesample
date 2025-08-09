using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RealStateAPI.AppVars;
using RealStateAPI.Context;
using RealStateAPI.DTO;
using RealStateAPI.Models;
using RealStateAPI.Repositories.Interface;

namespace RealStateAPI.Repositories
{
    public class PropertyRepo : IProperties
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public PropertyRepo(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Properties> InsertProperty(PropertyDTO dto)
        {
            var propObject = _mapper.Map<Properties>(dto);

            _context.Properties.Add(propObject);
            await _context.SaveChangesAsync();

            return propObject;
        }

        public async Task<IList<dynamic>> FetchProperties(int? userId)
        {
            var properties = await (from p in _context.Properties
                                    select new
                                    {
                                        p.Id,
                                        p.Title,
                                        p.Price,
                                        p.Address,
                                        p.Bedrooms,
                                        p.Bathrooms,
                                        p.Carspots,
                                        p.ImageUrl,
                                        p.listingType,
                                        IsFavourite = userId != null &&
                                                      _context.Favourites.Any(f => f.PropertyId == p.Id && f.UserId == userId)
                                    }).ToListAsync();

            return properties.Cast<object>().ToList();
        }
    }
}
