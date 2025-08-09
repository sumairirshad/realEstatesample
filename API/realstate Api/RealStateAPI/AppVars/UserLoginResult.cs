using RealStateAPI.Models;

namespace RealStateAPI.AppVars
{
    public class UserLoginResult
    {
        public int Code { get; set; }             
        public string Message { get; set; } = "";
        public Users? User { get; set; }
    }
}
