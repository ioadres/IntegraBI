using CoreDI;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using WebApi.Auth;
using Service.Contract;
using Model.Entities;
using System;

namespace WebApi
{
    public partial class Startup
    {
		public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
			//### Añade el contexto de base de datos.
            services.AddDbContext<AppDbContext>(builder =>
            {
                var connStr = Configuration["ConnectionStrings:DefaultConnection"];
                builder.UseSqlServer(connStr);
            });


			services.AddCors(options =>
		   {
			   options.AddPolicy("CorsPolicy",
				   builder => builder.AllowAnyOrigin()
				   .AllowAnyMethod()
				   .AllowAnyHeader()
				   .AllowCredentials());
		   });


			// Add framework services.
			services.AddMvc(config =>
            {
				//### Añade las políticas de acceso.
                config.Filters.Add(AuthPolicy.AuthorizeFilter());
            });           

			//### Politicas de Acceso.
            AuthPolicy.Config(services);

			//### DI Configurador.
            ServiceLocator.GetServiceLocatorService(services);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider serviceProvider)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

			ConfigureAuth(app, serviceProvider);

			app.UseCors("CorsPolicy");

			
            app.UseMvc();


        }
    }
}
