export interface PriceProvider {
  getCurrentPrice(investmentId: string): Promise<number>;
}
