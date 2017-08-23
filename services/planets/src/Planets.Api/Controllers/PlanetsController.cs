using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Planets.Api.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json.Linq;

namespace Planets.Api.Controllers
{
    [EnableCors("AnyCorsPolicy")]
    [Route("api/[controller]")]
    public class PlanetsController : Controller
    {
        private readonly ILogger<PlanetsController> _logger;
        private readonly IDynamoDbService _dynamoDbService;
        private readonly string _planetsTableName;

        private static readonly List<string> InitialLoad = new List<string> {"position", "name"};

        public IConfiguration Configuration { get; }

        public PlanetsController(ILogger<PlanetsController> logger, IDynamoDbService dynamoDbService,
            IConfiguration configuration)
        {
            _logger = logger;
            _dynamoDbService = dynamoDbService;
            Configuration = configuration;

            _planetsTableName = Configuration.GetValue<string>("PLANETS_TABLE_NAME");
        }

        // GET api/solarsystem
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var planets = await _dynamoDbService.GetAllItemsAsync(_planetsTableName, InitialLoad);
            var result = new JObject { { "solarSystemPlanets", planets } };

            return Ok(result);
        }

        // GET api/solarsystem/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var planet = await _dynamoDbService.GetItemAsync(id, _planetsTableName);
            return Ok(planet);
        }
    }
}
