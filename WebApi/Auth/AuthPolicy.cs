using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace WebApi.Auth
{
    public static class AuthPolicy
	{
		public static AuthorizeFilter AuthorizeFilter()
		{
			var policy = new AuthorizationPolicyBuilder()
								  .RequireAuthenticatedUser()
								  .Build();
			return new AuthorizeFilter(policy);
		}

		public static void Config(IServiceCollection services) {
            
            services.AddAuthorization(options =>
			{
				options.AddPolicy("Bot",
					policy =>
					{
						 policy.RequireClaim("UserId");
					}
				);

                options.AddPolicy("Client",
					policy =>
					{
						policy.RequireRole("Client");
					}
				);

				options.AddPolicy("Admin",
					policy =>
					{
						policy.RequireRole("Admin");
					}
				);

				options.AddPolicy(
					"Base",
					policyBuilder => policyBuilder.RequireAssertion(context => context.User.HasClaim(claim =>context.User.IsInRole("Client")) || context.User.IsInRole("Admin"))
				);
			});
		}
	}
}
