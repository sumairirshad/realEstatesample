using RealStateAPI.DTO;
using RealStateAPI.Models;

namespace RealStateAPI.Repositories.Interface
{
    public interface IProperties
    {
        Task<Properties> InsertProperty(PropertyDTO dto);
        Task<IList<dynamic>> FetchProperties(int? userId);
    }
}
