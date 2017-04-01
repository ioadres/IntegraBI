using System;
using System.Threading.Tasks;
using Common;

namespace Service.Contract
{
    public interface IUserService
    {
        Task<int> test();
		Task<UserDto> Login(string username, string password);
    }
}
