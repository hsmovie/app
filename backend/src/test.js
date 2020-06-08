var intrinioSDK = require('intrinio-sdk');
intrinioSDK.ApiClient.instance.authentications['ApiKeyAuth'].apiKey =
  'OmMxNjE1Nzk0YjBmNDdhMjQxN2QwZjgzMGNlNjRlOWFk';

const eTFsAPI = new intrinioSDK.ETFsApi();

const identifier = 'qqq';

async function getHoldings(nextPage = null) {
  const opts = {
    pageSize: 100,
    nextPage,
  };
  try {
    return await eTFsAPI.getEtfHoldings(identifier, opts);
  } catch (e) {
    // console.log(e);
  }
}

async function main() {
  let holdings = [];
  const result = await getHoldings();
  console.log(result);
  let next_page = result.next_page;
  console.log(next_page);
  while (next_page) {
    const result = await getHoldings(next_page);
    console.log(result);
    next_page = result.next_page;
    holdings = [...holdings, ...result.holdings];
  }

  console.log(holdings.length);
  console.log(holdings[0]);
}

main();
