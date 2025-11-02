

import type { Candlestick } from "./lighter-sdk-ts/generated";
export function getEma(prices: number[], period: number): number[] {
    const multiplier = 2 / (period + 1);
    const smaInterval = prices.length - period;
    if (smaInterval < 1) {
        throw new Error("Not enough prices provided");
    }

    let sma = 0;
    for (let i = 0; i < smaInterval; i++) {
        sma += (prices[i] ?? 0)
    }
    sma /= smaInterval;

    const emas = [sma];
    for(let i = 0; i < period; i++) {
        const ema = (emas[emas.length - 1] ?? 0) * (1 - multiplier) + (prices[smaInterval + i] ?? 0) * multiplier;
        emas.push(ema);
    }
    return emas;
}

export function getMidPrices(candlesticks: Candlestick[]) {
    return candlesticks.map(({open, close}) => Number(((open + close) / 2).toFixed(2)));
}