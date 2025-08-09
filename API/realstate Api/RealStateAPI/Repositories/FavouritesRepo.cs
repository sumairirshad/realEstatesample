using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IList<Favourites>> FetchFavouritedProperties(int userId)
        {
            return await _context.Favourites.Where(w => w.UserId == userId).ToListAsync();
        }
    }
}
