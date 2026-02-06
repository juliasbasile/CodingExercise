import { InvestmentsService } from "../src/investments/investments.service";
import { InvestmentsRepository } from "../src/investments/investments.repository";
import { PriceProvider } from "../src/pricing/price-provider";
import { NotFoundError } from "../src/shared/errors/api.error";
import { Investment } from "../src/shared/interfaces/investment";


describe("InvestmentsService", () => {
  let repo: jest.Mocked<InvestmentsRepository>;
  let priceProvider: jest.Mocked<PriceProvider>;
  let nowUtc: () => Date;
  let service: InvestmentsService;

  beforeEach(() => {
    repo = {
      getByUser: jest.fn(),
      getByUserAndId: jest.fn()
    } as unknown as jest.Mocked<InvestmentsRepository>;

    priceProvider = {
      getCurrentPrice: jest.fn()
    };

    // Fixed clock for deterministic tests
    nowUtc = () => new Date("2026-01-01T00:00:00Z");

    service = new InvestmentsService(repo, priceProvider, nowUtc);
  });

  describe("getInvestmentsByUser", () => {
    it("returns investment summaries for a user", async () => {
      repo.getByUser.mockResolvedValue([
        {
          userId: "user1",
          investmentId: "EQ-001",
          name: "Large Cap Equity Fund",
          shares: 10,
          costBasisPerShare: 120,
          purchaseDateUtc: new Date("2022-01-01")
        }
      ]);

      const result = await service.getInvestmentsByUser("user1");

      expect(result).toEqual([
        { investmentId: "EQ-001", name: "Large Cap Equity Fund" }
      ]);
    });
  });

  describe("getDetail", () => {
    const investment: Investment = {
      userId: "user1",
      investmentId: "EQ-001",
      name: "Large Cap Equity Fund",
      shares: 10,
      costBasisPerShare: 120,
      purchaseDateUtc: new Date("2022-01-01")
    };

    it("returns detailed investment performance", async () => {
      repo.getByUserAndId.mockResolvedValue(investment);
      priceProvider.getCurrentPrice.mockResolvedValue(150);

      const result = await service.getInvestmentDetails("user1", "EQ-001");

      expect(result).toEqual({
        investmentId: "EQ-001",
        name: "Large Cap Equity Fund",
        shares: 10,
        costBasisPerShare: 120,
        currentPrice: 150,
        currentValue: 1500,
        term: "LongTerm",
        totalGainLoss: 300
      });
    });

    it("calculates ShortTerm correctly", async () => {
      repo.getByUserAndId.mockResolvedValue({
        ...investment,
        purchaseDateUtc: new Date("2025-07-01")
      });

      priceProvider.getCurrentPrice.mockResolvedValue(150);

      const result = await service.getInvestmentDetails("user1", "EQ-001");

      expect(result.term).toBe("ShortTerm");
    });

    it("throws NotFoundError when investment does not exist", async () => {
      repo.getByUserAndId.mockResolvedValue(undefined);

      await expect(
        service.getInvestmentDetails("user1", "MISSING")
      ).rejects.toThrow(NotFoundError);
    });
  });
});
