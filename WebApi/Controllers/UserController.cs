using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Common;

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

		// GET api/values   
        [HttpPost("Add")]
        public async Task<UserDto> Add([FromBody]UserDto model)
        {
			if (model.UserId != null || model.UserId != "") {
				var result = await this._user.Update(model);
				if(result != null) {
					return new UserDto() {
						UserId = result.UserId,
						Username = result.Username					
					};
				}
			} else {
				var result = await this._user.Add(model);
				if(result != null) {
					return new UserDto() {
						UserId = result.UserId,
						Username = result.Username					
					};
				}
			}            

            return null;
        }

        // GET api/values   
        [HttpPost("GetAll")]
        public async Task<IEnumerable<UserDto>> GetAll()
        {            
            var result = await this._user.GetAll();
            return result.OrderByDescending(x=>x.DateCreated);
        }

        // GET api/values   
        [HttpPost("Get")]
        public async Task<UserDto> Get([FromBody] int userId)
        {           
            var result = await this._user.Get(userId);
            return result;
        }  
    }
}
