
using Microsoft.Extensions.DependencyInjection;
using Service.Contract;

namespace Service
{
	public static class Locator
	{
		public static void ServiceLocator<T>(T services)
		{
			((IServiceCollection)services).AddSingleton<IUserService, UserService>();

			//Lifetimes demo
			//services.AddTransient<IOperationTransient, Operation>();/
			//services.AddScoped<IOperationScoped, Operation>();
		}
	}
}
