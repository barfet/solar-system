using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Amazon.Runtime;
using Amazon;
using Newtonsoft.Json;
using Serilog;
using Planets.Api.Services;
using Microsoft.AspNetCore.Cors.Infrastructure;

namespace Planets.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().AddJsonOptions(options =>
            {
                var settings = options.SerializerSettings;
                settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            var corsBuilder = new CorsPolicyBuilder();
            corsBuilder.AllowAnyHeader();
            corsBuilder.AllowAnyMethod();
            corsBuilder.AllowAnyOrigin();

            services.AddCors(options =>
            {
                options.AddPolicy("AnyCorsPolicy", corsBuilder.Build());
            });

            // Pull in any SDK configuration from Configuration object
            var awsOptions = Configuration.GetAWSOptions();

            awsOptions.Credentials = new BasicAWSCredentials(Configuration.GetValue<string>("AWS_ACCESS_KEY_ID"),
                    Configuration.GetValue<string>("AWS_SECRET_ACCESS_KEY"));

            awsOptions.Region = RegionEndpoint.GetBySystemName(Configuration.GetValue<string>("AWS_REGION"));

            services.AddDefaultAWSOptions(awsOptions);

            // Add DynamoDB to the ASP.NET Core dependency injection framework.
            services.AddAWSService<Amazon.DynamoDBv2.IAmazonDynamoDB>();

            // Custom services
            services.AddScoped<IDynamoDbService, DynamoDbService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddDebug();
            loggerFactory.AddSerilog();

            app.UseExceptionHandler();
            app.UseMvc();
        }
    }
}
