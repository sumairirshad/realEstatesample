using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using RealStateAPI.AppVars;
using RealStateAPI.Context;
using RealStateAPI.DTO;
using RealStateAPI.Models;
using RealStateAPI.Repositories.Interface;

namespace RealStateAPI.Repositories
{
    public class FavouritesRepo : IFavourites
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public FavouritesRepo(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<(Favourites?, bool)> SaveFavourit(FavouritesDTO dto)
        {
            var existing = await _context.Favourites
                .Where(w => w.UserId == dto.UserId && w.PropertyId == dto.PropertyId)
                .FirstOrDefaultAsync();

            if (existing != null)
            {
                _context.Favourites.Remove(existing);
                await _context.SaveChangesAsync();
                return (null, false); 
            }

            var newFav = _mapper.Map<Favourites>(dto);
            _context.Favourites.Add(newFav);
            await _context.SaveChangesAsync();
            return (newFav, true);
        }

        public async Task<IList<dynamic>> FetchFavouritedProperties(int userId)
        {
            var result = await (from fav in _context.Favourites
                                join prop in _context.Properties
                                on fav.PropertyId equals prop.Id
                                where fav.UserId == userId
                                select new
                                {
                                    prop.Id,
                                    prop.UserId,
                                    prop.Title,
                                    prop.Descritption,
                                    prop.Address,
                                    prop.listingType,
                                    prop.Bedrooms,
                                    prop.Bathrooms,
                                    prop.Carspots,
                                    prop.ImageUrl,
                                    prop.CreatedAt,
                                    prop.Price,
                                    IsFavourite = userId != null &&
                                                      _context.Favourites.Any(f => f.PropertyId == prop.Id && f.UserId == userId)
                                }).ToListAsync<dynamic>(); 

            return result;
        }
    }
}
