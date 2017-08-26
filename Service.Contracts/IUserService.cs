using System.Collections.Generic;
using System.Threading.Tasks;
using Common;

namespace Service.Contracts
{
    public interface IUserService
    {
        Task<int> test();
		Task<UserDto> Login(string username, string password);

        Task<UserDto> Add(UserDto model);
        Task<UserDto> Update(UserDto model);
        Task<IEnumerable<UserDto>> GetAll();
        Task<UserDto> Get(int userId);
        Task<bool> Remove(int userId);
    }
}
