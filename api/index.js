var intrinioSDK = require('intrinio-sdk');
intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey =
  'OmMxNjE1Nzk0YjBmNDdhMjQxN2QwZjgzMGNlNjRlOWFk';

var eTFsAPI = new intrinioSDK.ETFsApi();

// var identifier = 'VTI'; // String | An ETF identifier (Ticker, Figi Ticker, ISIN, RIC, Intrinio ID)

// var opts = {
//   pageSize: 100, // Number | The number of results to return
//   nextPage: null, // String | Gets the next page of data from a previous API call
// };

// eTFsAPI.getEtfHoldings(identifier, opts).then(
//   function (data) {
//     console.log(data);
//   },
//   function (error) {
//     console.error(error);
//   }
// );

var opts = {
  exchange: 'XNAS', // String |
  pageSize: 100, // Number | The number of results to return
  nextPage: null, // String | Gets the next page of data from a previous API call
};

eTFsAPI.getAllEtfs(opts).then(
  function (data) {
    console.log(data);
  },
  function (error) {
    console.error(error);
  }
);
