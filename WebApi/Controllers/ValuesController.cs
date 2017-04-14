using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class ValuesController : Controller
    {
		private IUserService _user;
		public ValuesController(IUserService user)
		{
			this._user = user;
		}

        // GET api/values
        [HttpGet]
        public async Task<IEnumerable> Get()
        {
            var value = await this._user.test();

            return new string[] { "value1", "value2", value.ToString() };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
