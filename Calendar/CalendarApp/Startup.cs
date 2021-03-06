using CalendarApp.Filters;
using CalendarRepository;
using CalendarRepository.Seeds;
using CalendarRepository.Settings;
using CalendarServices;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CalendarApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("CORSpolicy", builder =>
            {
                builder.WithOrigins("*")
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.Configure<CalendarDatabaseSettings>(
                Configuration.GetSection(nameof(CalendarDatabaseSettings)));

            services.AddSingleton<ICalendarDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<CalendarDatabaseSettings>>().Value);

            ConfigureErrorMiddleware(services);
            ServicesLayerInjection(services);
            RepositoriesLayerInjection(services);

            services.AddControllers();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IRunSeeds seeds)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseCors("CORSpolicy");

            seeds.PopulateDatabase();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "api/{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        private void ConfigureErrorMiddleware(IServiceCollection services)
        {
            services.AddControllers(options =>
            options.Filters.Add(new ExceptionsFilter()));
        }
        private void ServicesLayerInjection(IServiceCollection services)
        {
            services.AddSingleton<IEventsServices, EventsServices>();
            services.AddSingleton<IGeneralServices, GeneralServices>();
        }

        private void RepositoriesLayerInjection(IServiceCollection services)
        {
            services.AddSingleton<IRunSeeds, RunSeeds>();
            services.AddTransient<IEventsRepository, EventsRepository>();
            services.AddTransient<ICitiesRepository, CitiesRepository>();
            services.AddTransient<IColorsRepository, ColorsRepository>();
        }
    }
}
