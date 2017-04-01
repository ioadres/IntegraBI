using Model.Entities;
using Repository.Contracts.Helper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Contracts
{
	public abstract class IUserRepository : EntityFrameworkRepository<AppDbContext, User>
    {
		public IUserRepository(AppDbContext context) : base(context)
        {
		}

		public abstract Task<User> Login(string username, string password);
    }
}
