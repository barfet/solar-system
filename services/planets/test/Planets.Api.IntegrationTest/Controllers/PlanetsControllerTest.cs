using System;
using System.Net;
using System.Net.Http;
using FluentAssertions;
using Newtonsoft.Json.Linq;
using Xunit;
using System.Threading.Tasks;

namespace Planets.Api.IntegrationTest.Controllers
{
    public class PlanetsControllerTest : IClassFixture<PlanetsIntegrationTestFixture<Startup>>
    {
        private readonly HttpClient _client;

        public PlanetsControllerTest(PlanetsIntegrationTestFixture<Startup> fixture)
        {
            _client = fixture.Client;
        }

        [Fact]
        public async Task Should_return_httpStatusCode_Ok_When_planets_called()
        {
            // Arrange

            // Act
            var response = await _client.GetAsync("api/planets");

            // Assert
            response.EnsureSuccessStatusCode();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            response.Content.Headers.ContentType.Equals("application/json; charset=utf-8");
        }

        [Fact]
        public async Task Should_return_httpStatusCode_Ok_When_planet_called()
        {
            // Arrange

            // Act
            var response = await _client.GetAsync("api/planets/1");

            // Assert
            response.EnsureSuccessStatusCode();
            response.StatusCode.Should().Be(HttpStatusCode.OK);
            response.Content.Headers.ContentType.Equals("application/json; charset=utf-8");
        }
    }
}
