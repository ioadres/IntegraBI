using Model.Entities;
using Repository.Contracts.Helper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Common;

namespace Repository.Contracts
{
	public abstract class IUserRepository : EntityFrameworkRepository<AppDbContext, User>
    {
		public IUserRepository(AppDbContext context) : base(context)
        {
		}

		public abstract Task<User> Login(string username, string password);
        public abstract Task<User> Get(int userid);
		public abstract Task<UserDto> Add(UserDto model);

        public abstract Task<UserDto> Update(UserDto model);
        public abstract Task<IEnumerable<UserDto>> GetAll();
        public abstract Task<bool> Remove(int userId);
    }
}
