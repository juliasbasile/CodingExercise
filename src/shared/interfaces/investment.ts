export interface Investment {
  userId: string;
  investmentId: string;
  name: string;
  shares: number;
  costBasisPerShare: number;
  purchaseDateUtc: Date;
}

export interface InvestmentSummaryDto {
  investmentId: string;
  name: string;
}

export type InvestmentTerm = "ShortTerm" | "LongTerm";

export interface InvestmentDetailDto {
  investmentId: string;
  name: string;
  shares: number;
  costBasisPerShare: number;
  currentPrice: number;
  currentValue: number;
  term: InvestmentTerm;
  totalGainLoss: number;
}
