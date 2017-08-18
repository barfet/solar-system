using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.Model;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Planets.Api.Services
{
    public interface IDynamoDbService
    {
        Task<string> GetItemAsync(string key, string tableName);
        Task<JToken> GetAllItemsAsync(string tableName);
    }

    public class DynamoDbService : IDynamoDbService
    {
        private IAmazonDynamoDB AmazonDynamoDbClient { get; }
        private readonly ILogger _logger;

        public DynamoDbService(IAmazonDynamoDB amazonDynamoDbClient, ILogger<DynamoDbService> logger)
        {
            AmazonDynamoDbClient = amazonDynamoDbClient;
            _logger = logger;
        }

        public async Task<string> GetItemAsync(string key, string tableName)
        {
            var table = Table.LoadTable(AmazonDynamoDbClient, tableName);

            try
            {
                var item = await table.GetItemAsync(key);
                var jsonText = item?.ToJsonPretty();

                return jsonText;
            }
            catch (AmazonDynamoDBException ex)
            {
                _logger.LogError($"DynamoDB error message:'{ex}' when getting Web Components.");
                throw;
            }

        }

        public async Task<JToken> GetAllItemsAsync(string tableName)
        {
            try
            {
                var response = await AmazonDynamoDbClient.ScanAsync(new ScanRequest { TableName = tableName });
                return ToJsonResponse(response.Items);
            }
            catch (AmazonDynamoDBException ex)
            {
                _logger.LogError($"DynamoDB error message:'{ex}' when getting Web Components.");
                throw;
            }

        }

        private static JToken ToJsonResponse(IEnumerable<IDictionary<string, AttributeValue>> components)
        {
            var container = new JArray();

            foreach (var component in components)
            {
                var keys = component.Keys;
                var values = component.Values;
                var webComponent = new JObject();

                for (var i = 0; i < keys.Count; i++)
                {
                    var key = keys.ElementAt(i);
                    var value = values.ElementAt(i);

                    webComponent.Add(key, value.S);
                }
                container.Add(webComponent);
            }

            return container;
        }
    }
}
