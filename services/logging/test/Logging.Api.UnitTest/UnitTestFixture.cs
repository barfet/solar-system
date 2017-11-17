using System.Reflection;
using Logging.Api.Test.Common;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace Logging.Api.UnitTest
{
    /// <summary>
	/// A test fixture which gathers settings from the target project (project we wish to test).
	/// </summary>
	/// <typeparam name="TStartup">Target project's startup type</typeparam>
    public class UnitTestFixture<TStartup>
    {
        public UnitTestFixture()
            : this(Path.Combine("src"))
        {
        }

        protected UnitTestFixture(string solutionRelativeTargetProjectParentDir)
        {
            var startupAssembly = typeof(TStartup).GetTypeInfo().Assembly;
            var contentRoot = ProjectPath.Get(solutionRelativeTargetProjectParentDir, startupAssembly);
            ContentRoot = contentRoot;
            EnvironmentName = "Development";

            var configurationBuilder = new ConfigurationBuilder()
                .SetBasePath(contentRoot)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

            Configuration = configurationBuilder.Build();
        }

        public string ContentRoot { get; }
        public string EnvironmentName { get; }
        public IConfigurationRoot Configuration { get; }
    }
}
