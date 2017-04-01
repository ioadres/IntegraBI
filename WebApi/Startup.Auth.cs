using System;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.IdentityModel.Tokens;
using WebApi.Auth;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using Service.Contract;
using Common;

namespace WebApi
{
	public partial class Startup
	{
		private SymmetricSecurityKey signingKey;
		private IUserService _user;

		private void ConfigureAuth(IApplicationBuilder app, IServiceProvider serviceProvider)
		{
			_user = (IUserService)serviceProvider.GetService(typeof(IUserService));

			signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("TokenAuthentication:SecretKey").Value));

			var tokenProviderOptions = new TokenProviderOptions
			{
				Path = Configuration.GetSection("TokenAuthentication:TokenPath").Value,
				Audience = Configuration.GetSection("TokenAuthentication:Audience").Value,
				Issuer = Configuration.GetSection("TokenAuthentication:Issuer").Value,
				SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
				IdentityResolver = GetIdentity //### Método que valida el acceso.
			};

			var tokenValidationParameters = new TokenValidationParameters
			{
				// The signing key must match!
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = signingKey,
				// Validate the JWT Issuer (iss) claim
				ValidateIssuer = true,
				ValidIssuer = Configuration.GetSection("TokenAuthentication:Issuer").Value,
				// Validate the JWT Audience (aud) claim
				ValidateAudience = true,
				ValidAudience = Configuration.GetSection("TokenAuthentication:Audience").Value,
				// Validate the token expiry
				ValidateLifetime = true,
				// If you want to allow a certain amount of clock drift, set that here:
				ClockSkew = TimeSpan.Zero
			};

			app.UseJwtBearerAuthentication(new JwtBearerOptions
			{
				AutomaticAuthenticate = true,
				AutomaticChallenge = true,
				TokenValidationParameters = tokenValidationParameters
			});

			app.UseMiddleware<TokenProviderMiddleware>(Options.Create(tokenProviderOptions));
		}


		private async Task<ClaimsIdentity> GetIdentity(string username, string password)
		{
			var now = DateTime.UtcNow;
			var user = await this._user.Login(username, password);
			if (user != null) { 
				return await Task.FromResult(
					new ClaimsIdentity(new GenericIdentity(user.Username, "Token"), new Claim[] {
						new Claim("Role", user.Rol.Name),
						new Claim("Username", user.Username),
						new Claim("UserId", user.Id.ToString()),
						new Claim(ClaimTypes.Role, user.Rol.Name, Configuration.GetSection("TokenAuthentication:Issuer").Value),
						new Claim(JwtRegisteredClaimNames.Sub, user.Username),
						new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUniversalTime().ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
					})
				);
			}
			//### Account doesn't exists
			return await Task.FromResult<ClaimsIdentity>(null);
		}
	}
}