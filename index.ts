import { CandlestickApi, IsomorphicFetchHttpLibrary, ServerConfiguration } from "./lighter-sdk-ts/generated";
const BASE_URL = "https://mainnet.zklighter.elliot.ai"
const SOL_MARKET_ID = 2

async function getKlines(marketId: number) {
    const klinesApi = new CandlestickApi({
        baseServer: new ServerConfiguration<{  }>(BASE_URL, {  }),
        httpApi: new IsomorphicFetchHttpLibrary(),
        middleware: [],
        authMethods: {}
    });

    const klines = await klinesApi.candlesticks(SOL_MARKET_ID, '5m', Date.now() - 1000 * 60 * 60 * 1, Date.now(), 50, false);
    const midPrices = klines.candlesticks.slice(-10).map(({open, close}) => ((open + close) / 2).toFixed(2));
    console.log(midPrices);
}

getKlines(SOL_MARKET_ID);