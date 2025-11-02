import { getMidPrices, getEma } from "./indicators";
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
    const midPrices = getMidPrices(klines.candlesticks);
    console.log(midPrices.slice(-10));
    const ema20s = getEma(midPrices, 20);
    console.log(ema20s.slice(-10));
}

getKlines(SOL_MARKET_ID);