using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Planets.Api.Services;
using Microsoft.Extensions.Configuration;

namespace Planets.Api.Controllers
{
    [Route("api/[controller]")]
    public class SolarSystemController : Controller
    {
        private readonly ILogger<SolarSystemController> _logger;
        private readonly IDynamoDbService _dynamoDbService;
        private readonly string _planetsTableName;

        public IConfiguration Configuration { get; }

        public SolarSystemController(ILogger<SolarSystemController> logger, IDynamoDbService dynamoDbService,
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
            var planets = await _dynamoDbService.GetAllItemsAsync(_planetsTableName);
            return Ok(planets);
        }

        // GET api/solarsystem/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
    }
}
