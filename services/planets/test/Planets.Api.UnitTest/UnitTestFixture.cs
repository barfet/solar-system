using System;
using System.IO;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using Planets.Api.Test.Common;

namespace Planets.Api.UnitTest
{
    /// <summary>
    /// A test fixture which gathers Planets from the target project (project we wish to test).
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

            var configurationBuilder = new ConfigurationBuilder()
                .SetBasePath(contentRoot)
                .AddJsonFile("appPlanets.json", optional: false, reloadOnChange: true);

            Configuration = configurationBuilder.Build();
        }

        public String ContentRoot { get; }
        public  IConfigurationRoot Configuration { get; }
    }
}
