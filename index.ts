import { getMidPrices, getEma, getMacd } from "./indicators";
import { CandlestickApi, IsomorphicFetchHttpLibrary, ServerConfiguration } from "./lighter-sdk-ts/generated";
const BASE_URL = "https://mainnet.zklighter.elliot.ai"
const SOL_MARKET_ID = 0

const klinesApi = new CandlestickApi({
        baseServer: new ServerConfiguration<{  }>(BASE_URL, {  }),
        httpApi: new IsomorphicFetchHttpLibrary(),
        middleware: [],
        authMethods: {}
});

async function getIndicators(duration: "5m" | "4h", marketId: number) {
    const klines = await klinesApi.candlesticks(SOL_MARKET_ID, duration, Date.now() - 1000 * 60 * 60 * (duration === "5m" ? 2 : 96), Date.now(), 50, false);
    const midPrices = getMidPrices(klines.candlesticks);
    console.log(`POSITION ${duration}`)
    console.log("MID PRICES")
    console.log(midPrices);
    const ema20s = getEma(midPrices, 20);
    console.log("EMA20s")
    console.log(ema20s.slice(-10));
    console.log("MACDS")
    const macd = getMacd(midPrices).slice(-10);
    console.log(macd);
}

async function getKlines(marketId: number) {
    getIndicators("5m", marketId);
    getIndicators("4h", marketId);
}

getKlines(SOL_MARKET_ID);