using System;
using System.Threading.Tasks;
using Model.Entities;
using Repository.Contracts;
using Repository.Contracts.Helper;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
	public class UserRepository : IUserRepository
    {
		public UserRepository(GameDbContext context) : base(context)
        {
		}

		public override async Task<User> Login(string username, string password)
		{
			return await Task.Run(() => { 
				return this.Context.User.Include(x => x.Rol).Where(x => x.Username == username && x.Password == password).FirstOrDefault();			
			});
		}
    }
}
