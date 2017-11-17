using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Logging.Api.Test.Common;
using Microsoft.Extensions.Configuration;

namespace Logging.Api.IntegrationTest
{
    public class IntegrationTestFixture<TStartup> : IDisposable
    {
        private readonly TestServer _server;

        private readonly string IPREO_API_ACCOUNT_HOST;
        private readonly string IPREO_ACCOUNT_CLIENT;
        private readonly string IPREO_ACCOUNT_CLIENT_SECRET;
        private readonly string IPREO_ACCOUNT_EMAIL;
        private readonly string IPREO_ACCOUNT_PASSWORD;
        private readonly string IPREO_MUNI_JWT_ISSUER;
        private readonly string IPREO_MUNI_JWT_AUDIENCE;
        private readonly string IPREO_MUNI_JWT_SECRET;

        public IntegrationTestFixture()
            : this("src")
        {
        }

        protected IntegrationTestFixture(string solutionRelativeTargetProjectParentDir)
        {
            var startupAssembly = typeof(TStartup).GetTypeInfo().Assembly;
            var contentRoot = ProjectPath.Get(solutionRelativeTargetProjectParentDir, startupAssembly);
            ContentRoot = contentRoot;

            var configurationBuilder = new ConfigurationBuilder()
                .SetBasePath(contentRoot)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            configurationBuilder.AddEnvironmentVariables();
            Configuration = configurationBuilder.Build();

            var builder = new WebHostBuilder()
                .UseContentRoot(contentRoot)
                .ConfigureServices(InitializeServices)
                .UseEnvironment("Development")
                .UseStartup(typeof(TStartup))
                .UseConfiguration(Configuration);

            _server = new TestServer(builder);

            Client = _server.CreateClient();
            Client.BaseAddress = new Uri("http://localhost");

            IPREO_API_ACCOUNT_HOST = Configuration.GetValue<string>("IPREO_ACCOUNT_HOST");
            IPREO_ACCOUNT_CLIENT = Configuration.GetValue<string>("IPREO_ACCOUNT_TEST_CLIENT");
            IPREO_ACCOUNT_CLIENT_SECRET = Configuration.GetValue<string>("IPREO_ACCOUNT_TEST_CLIENT_SECRET");
            IPREO_ACCOUNT_EMAIL = Configuration.GetValue<string>("IPREO_ACCOUNT_TEST_EMAIL");
            IPREO_ACCOUNT_PASSWORD = Configuration.GetValue<string>("IPREO_ACCOUNT_TEST_PASSWORD");
            IPREO_MUNI_JWT_ISSUER = Configuration.GetValue<string>("IPREO_MUNI_JWT_ISSUER");
            IPREO_MUNI_JWT_AUDIENCE = Configuration.GetValue<string>("IPREO_MUNI_JWT_AUDIENCE");
            IPREO_MUNI_JWT_SECRET = Configuration.GetValue<string>("IPREO_MUNI_JWT_SECRET");
        }

        public HttpClient Client { get; }

        public String ContentRoot { get; }

        public static IConfigurationRoot Configuration { get; private set; }

        public void Dispose()
        {
            Client.Dispose();
            _server.Dispose();
        }

        protected virtual void InitializeServices(IServiceCollection services)
        {
            var startupAssembly = typeof(TStartup).GetTypeInfo().Assembly;

            // Inject a custom application part manager. Overrides AddMvcCore() because that uses TryAdd().
            var manager = new ApplicationPartManager();
            manager.ApplicationParts.Add(new AssemblyPart(startupAssembly));

            manager.FeatureProviders.Add(new ControllerFeatureProvider());
            services.AddSingleton(manager);
        }

        public async Task<string> GetReferenceToken()
        {
            var postData =
                new List<KeyValuePair<string, string>>
                {
                    new KeyValuePair<string, string>("username", IPREO_ACCOUNT_EMAIL),
                    new KeyValuePair<string, string>("password", IPREO_ACCOUNT_PASSWORD),
                    new KeyValuePair<string, string>("scope", "openid email profile ipreo-api polaris"),
                    new KeyValuePair<string, string>("client_id", "home-dev"),
                    new KeyValuePair<string, string>("grant_type", "password")
                };

            using (var realClient = new HttpClient())
            {
                realClient.BaseAddress = new Uri(IPREO_API_ACCOUNT_HOST);
                realClient.SetBasicAuthentication(IPREO_ACCOUNT_CLIENT, IPREO_ACCOUNT_CLIENT_SECRET);

                using (var content = new FormUrlEncodedContent(postData))
                {
                    var response = await realClient.PostAsync("/connect/token", content);
                    var contents = await response.Content.ReadAsStringAsync();

                    return contents;
                }
            }
        }
    }
}
