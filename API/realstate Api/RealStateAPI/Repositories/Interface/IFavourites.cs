using RealStateAPI.DTO;
using RealStateAPI.Models;

namespace RealStateAPI.Repositories.Interface
{
    public interface IFavourites
    {
        Task<(Favourites?, bool)> SaveFavourit(FavouritesDTO dto);
        Task<IList<dynamic>> FetchFavouritedProperties(int userId);
    }
}
