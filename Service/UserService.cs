using Repository.Contracts;
using System.Threading.Tasks;
using Service.Contracts;
using Common;
using System.Collections.Generic;

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

        public async Task<UserDto> Add(UserDto model)
        {
            var result = await _userRepo.Add(model);
            return result;
        }

        public async  Task<UserDto> Update(UserDto model)
        {
            var result = await _userRepo.Update(model);
            return result;
        }

        public async  Task<IEnumerable<UserDto>> GetAll()
        {
            var result = await _userRepo.GetAll();
            return result;
        }

        public async Task<UserDto> Get(int userId)
        {
             var result = await _userRepo.Get(userId);
            return UserMapper.Map(result);
        }

        public async  Task<bool> Remove(int userId) {
            return await Task.Run(() => {               
                return _userRepo.Remove(userId);
            });
            
        }
    }
}
