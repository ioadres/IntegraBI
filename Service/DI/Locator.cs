
using Microsoft.Extensions.DependencyInjection;
using Service.Contracts;

namespace Service
{
	public static class Locator
	{
		public static void ServiceLocator<T>(T services)
		{
			((IServiceCollection)services).AddSingleton<IUserService, UserService>();
			((IServiceCollection)services).AddSingleton<IReportService, ReportService>();
			((IServiceCollection)services).AddSingleton<IChartService, ChartService>();
			((IServiceCollection)services).AddSingleton<ITokenReportService, TokenReportService>();

			//Lifetimes demo
			//services.AddTransient<IOperationTransient, Operation>();/
			//services.AddScoped<IOperationScoped, Operation>();
		}
	}
}
