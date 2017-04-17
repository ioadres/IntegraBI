using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace WebApi.Auth
{
	public class TokenProviderMiddleware
	{
		private readonly RequestDelegate _next;
		private readonly TokenProviderOptions _options;
		private readonly JsonSerializerSettings _serializerSettings;

		public TokenProviderMiddleware(
			RequestDelegate next,
			IOptions<TokenProviderOptions> options)
		{
			_next = next;

			_options = options.Value;
			ThrowIfInvalidOptions(_options);

			_serializerSettings = new JsonSerializerSettings
			{
				Formatting = Formatting.Indented
			};
		}

		public Task Invoke(HttpContext context)
		{
			context.Response.Headers.Add("Access-Control-Allow-Headers", new string[] { "Authorization", "Content-Type" });
			context.Response.Headers.Add("Access-Control-Allow-Methods", new string[] { "POST", "GET", "DELETE", "PUT" });
			context.Response.Headers.Add("Access-Control-Allow-Origin", "*");

			if (!context.Request.Path.Equals(_options.Path, StringComparison.Ordinal))
			{
				return _next(context);
			}

			// Request must be POST with Content-Type: application/x-www-form-urlencoded
			if (!context.Request.Method.Equals("POST")
			   || !context.Request.HasFormContentType)
			{
				context.Response.StatusCode = 400;
				return context.Response.WriteAsync("Bad request.");
			}


			return GenerateToken(context);
		}

		private async Task GenerateToken(HttpContext context)
		{
			var username = context.Request.Form["username"];
			var password = context.Request.Form["password"];

			var identity = await _options.IdentityResolver(username, password);
			if (identity == null)
			{
				context.Response.StatusCode = 400;
				await context.Response.WriteAsync("Invalid username or password.");
				return;
			}

			// Specifically add the jti (nonce), iat (issued timestamp), and sub (subject/user) claims.
			// You can add other claims here, if you want:
			//var claims = identity.Claims;

			var now = DateTime.UtcNow;

			// Create the JWT and write it to a string
			var jwt = new JwtSecurityToken(
				issuer: _options.Issuer,
				audience: _options.Audience,
				claims: identity.Claims,
				notBefore: now,
				expires: now.Add(_options.Expiration),
				signingCredentials: _options.SigningCredentials);
			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

			var response = new
			{
				access_token = encodedJwt,
				expires_in = (int)_options.Expiration.TotalSeconds
			};

			// Serialize and return the response
			context.Response.ContentType = "application/json";
			await context.Response.WriteAsync(JsonConvert.SerializeObject(response, _serializerSettings));
		}

		private static void ThrowIfInvalidOptions(TokenProviderOptions options)
		{
			if (string.IsNullOrEmpty(options.Path))
			{
				throw new ArgumentNullException(nameof(TokenProviderOptions.Path));
			}

			if (string.IsNullOrEmpty(options.Issuer))
			{
				throw new ArgumentNullException(nameof(TokenProviderOptions.Issuer));
			}

			if (string.IsNullOrEmpty(options.Audience))
			{
				throw new ArgumentNullException(nameof(TokenProviderOptions.Audience));
			}

			if (options.Expiration == TimeSpan.Zero)
			{
				throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(TokenProviderOptions.Expiration));
			}

			if (options.IdentityResolver == null)
			{
				throw new ArgumentNullException(nameof(TokenProviderOptions.IdentityResolver));
			}

			if (options.SigningCredentials == null)
			{
				throw new ArgumentNullException(nameof(TokenProviderOptions.SigningCredentials));
			}			
		}

	}
}
