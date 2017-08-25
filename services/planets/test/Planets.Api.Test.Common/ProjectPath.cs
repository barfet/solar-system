using System;
using System.IO;
using System.Reflection;
using Microsoft.Extensions.PlatformAbstractions;

namespace Planets.Api.Test.Common
{
    public static class ProjectPath
    {
        private const string SolutionName = "Planets.Api.sln";

        public static string PlanetsPath = GetSolutionFilePath() + "/PlanetsSamples/";

        /// <summary>
        /// Gets the full path to the target project path that we wish to test
        /// </summary>
        /// <param name="solutionRelativePath">
        /// The parent directory of the target project.
        /// e.g. src, samples, test, or test/Websites
        /// </param>
        /// <param name="startupAssembly">The target project's assembly.</param>
        /// <returns>The full path to the target project.</returns>
        public static string Get(string solutionRelativePath, Assembly startupAssembly)
        {
            // Get name of the target project which we want to test
            var projectName = startupAssembly.GetName().Name;

            var solutionFilePath = GetSolutionFilePath();

            return Path.GetFullPath(Path.Combine(solutionFilePath, solutionRelativePath, projectName));
        }

        public static string GetSolutionFilePath()
        {
            // Get currently executing test project path
            var applicationBasePath = PlatformServices.Default.Application.ApplicationBasePath;

            // Find the folder which contains the solution file. We then use this information to find the target
            // project which we want to test.
            var directoryInfo = new DirectoryInfo(applicationBasePath);
            do
            {
                var solutionFileInfo = new FileInfo(Path.Combine(directoryInfo.FullName, SolutionName));
                if (solutionFileInfo.Exists)
                {
                    return solutionFileInfo.Directory.FullName;
                }

                directoryInfo = directoryInfo.Parent;
            }
            while (directoryInfo.Parent != null);

            throw new Exception($"Solution root could not be located using application root {applicationBasePath}.");
        }
    }
}
