import { PriceProvider } from "./price-provider";

export class MockPriceProvider implements PriceProvider {
  async getCurrentPrice(investmentId: string): Promise<number> {
    const prices: Record<string, number> = {
      "EQ-001": 52.75,
      "BD-101": 96.40,
      "MF-550": 145.10
    };

    return prices[investmentId] ?? 100;
  }

}
