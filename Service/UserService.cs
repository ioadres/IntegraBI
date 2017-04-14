using Repository.Contracts;
using System.Threading.Tasks;
using Service.Contracts;
using Common;

namespace Service
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepo;

        public UserService(IUserRepository userRepo)
        {
            this._userRepo = userRepo;
        }

        public async Task<int> test()
        {
            var id = 1;
            var user = await _userRepo.Load(id);

            return 2;
        }

		public async Task<UserDto> Login(string username, string password)
		{
			var user = await _userRepo.Login(username, password);
			if (user == null)
			{
				return null;
			}

			return UserMapper.Map(user);
		}
    }
}
