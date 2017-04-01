
using Microsoft.Extensions.DependencyInjection;
using Repository.Contracts;

namespace Repository
{
	public static class Locator
	{
		public static void ServiceLocator<T>(T services)
		{
			((IServiceCollection)services).AddSingleton<IUserRepository, UserRepository>();

			//Lifetimes demo
			//services.AddTransient<IOperationTransient, Operation>();/
			//services.AddScoped<IOperationScoped, Operation>();
		}
	}
}
