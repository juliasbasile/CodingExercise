
import { InvestmentSummaryDto, InvestmentDetailDto, InvestmentTerm } from "../shared/interfaces/investment";
import { PriceProvider } from "../pricing/price-provider";
import { NotFoundError } from "../shared/errors/api.error";
import { InvestmentsRepository } from "./investments.repository";

export class InvestmentsService {
  constructor(
    private readonly repository: InvestmentsRepository,
    private readonly priceProvider: PriceProvider,
    private readonly nowUtc: () => Date
  ) {}

  async getInvestmentsByUser(userId: string): Promise<InvestmentSummaryDto[]> {
    const investments = await this.repository.getByUser(userId);
    return investments.map(i => ({
      investmentId: i.investmentId,
      name: i.name
    }));
  }

  async getInvestmentDetails(userId: string, investmentId: string): Promise<InvestmentDetailDto> {
    const investment = await this.repository.getByUserAndId(userId, investmentId);
    if (!investment) {
      throw new NotFoundError("Investment not found");
    }

    const currentPrice = await this.priceProvider.getCurrentPrice(investment.investmentId);
    const currentValue = investment.shares * currentPrice;
    const totalCost = investment.shares * investment.costBasisPerShare;


    return {
      investmentId: investment.investmentId,
      name: investment.name,
      shares: investment.shares,
      costBasisPerShare: investment.costBasisPerShare,
      currentPrice,
      currentValue,
      term: this.calculateTerm(investment.purchaseDateUtc),
      totalGainLoss: currentValue - totalCost
    };
  }

  private calculateTerm(purchaseDate: Date): InvestmentTerm {
    const daysOwned =
      (this.nowUtc().getTime() - purchaseDate.getTime()) /
      (1000 * 60 * 60 * 24);

    return daysOwned <= 365 ? "ShortTerm" : "LongTerm";
  }
}
