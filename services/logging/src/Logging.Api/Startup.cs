using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Amazon.Runtime;
using Amazon;
using Amazon.Extensions.NETCore.Setup;
using AspNetDotEnvConfigurationProvider;
using Serilog;

namespace Logging.Api
{
    public class Startup
    {
        private readonly AWSOptions _awsOptions;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddDotEnvVariables(true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();

            // Pull in any SDK configuration from Configuration object
            _awsOptions = Configuration.GetAWSOptions();

            if (env.IsDevelopment())
            {
                _awsOptions.Credentials = new BasicAWSCredentials(Configuration.GetValue<string>("AWS_ACCESS_KEY_ID"),
                    Configuration.GetValue<string>("AWS_SECRET_ACCESS_KEY"));
            }
            else
            {
                _awsOptions.Credentials = new EnvironmentVariablesAWSCredentials();
            }

            _awsOptions.Region = RegionEndpoint.GetBySystemName(Configuration.GetValue<string>("AWS_REGION"));

        }

        public static IConfigurationRoot Configuration { get; private set; }

        // This method gets called by the runtime. Use this method to add services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IConfiguration>(Configuration);

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
                options.AddPolicy("LoggingCorsPolicy", corsBuilder.Build());
            });

            services.AddDefaultAWSOptions(_awsOptions);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                loggerFactory.AddSerilog();
            }
            else
            {
                loggerFactory.AddLambdaLogger(Configuration.GetLambdaLoggerOptions());
            }

            app.UseCors("LoggingCorsPolicy");
            app.UseExceptionHandler();
            app.UseStatusCodePages();

            app.UseMvc();
        }
    }
}
