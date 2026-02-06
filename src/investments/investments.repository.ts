import { Investment } from "../shared/interfaces/investment";

export class InvestmentsRepository {
  private investments: Investment[] = [
    {
      userId: "user1",
      investmentId: "EQ-001",
      name: "Large Cap Equity Fund",
      shares: 120,
      costBasisPerShare: 45.25,
      purchaseDateUtc: new Date("2022-03-15")
    },
    {
      userId: "user1",
      investmentId: "BD-101",
      name: "Intermediate Bond Fund",
      shares: 200,
      costBasisPerShare: 98.10,
      purchaseDateUtc: new Date("2023-08-01")
    },
    {
      userId: "user2",
      investmentId: "MF-550",
      name: "Global Balanced Fund",
      shares: 75,
      costBasisPerShare: 132.40,
      purchaseDateUtc: new Date("2021-11-10")
    }
  ];


  async getByUser(userId: string): Promise<Investment[]> {
    return this.investments.filter(i => i.userId === userId);
  }

  async getByUserAndId(userId: string, investmentId: string): Promise<Investment | undefined> {
    return this.investments.find(
      i => i.userId === userId && i.investmentId === investmentId
    );
  }
}
