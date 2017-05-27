using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using WebApi.Model;

namespace WebApi.Controllers
{
	[Authorize(Policy = "Base")]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
		private IUserService _user;
		public UserController(IUserService user)
		{
			this._user = user;
		}

        // GET api/values   
		[HttpGet("GetUserContext")]
		public UserDto GetUserContext()
        {
			var user = new UserDto();
			user.Username = User.Claims.Where(c => c.Type == "Username").FirstOrDefault().Value;
			user.Role = User.Claims.Where(c => c.Type == "Role").FirstOrDefault().Value;
			user.UserId = User.Claims.Where(c => c.Type == "UserId").FirstOrDefault().Value;
			return user;
        }          
    }
}
