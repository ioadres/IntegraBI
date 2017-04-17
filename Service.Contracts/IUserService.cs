using System.Threading.Tasks;
using Common;

namespace Service.Contracts
{
    public interface IUserService
    {
        Task<int> test();
		Task<UserDto> Login(string username, string password);
    }
}
