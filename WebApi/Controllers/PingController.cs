using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi
{
	[Route("api")]
    public class PingController : Controller
	{
		[HttpGet]
		[Route("ping")]
		public string Ping()
		{
			return "Pong";
		}

		[Authorize(Policy = "Client")]
		[HttpGet("claims")]
		public object Claims()
		{
			return User.Claims.Select(c =>
			new
			{
				Type = c.Type,
				Value = c.Value
			});
		}

		[Authorize]
		[HttpGet]
		[Route("ping/secure")]
		[Authorize(Policy = "Admin")]
		public string PingSecured()
		{
			return "All good. You only get this message if you are authenticated.";
		}

		[Authorize]
		[HttpGet]
		[Route("ping/base")]
		[Authorize(Policy = "Base")]
		public string Base()
		{
			return "All good. You only get this message if you are authenticated.";
		}
	}
}
