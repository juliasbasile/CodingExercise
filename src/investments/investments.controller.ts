import { NextFunction, Request, Response } from "express";
import { InvestmentsService } from "./investments.service";

export class InvestmentsController {
  constructor(private readonly service: InvestmentsService) { }

  async getInvestmentsByUser(req: Request, res: Response, next: NextFunction) {
    const result = await this.service.getInvestmentsByUser(req.params.userId as string);
    res.json(result);
  }

  async getInvestmentDetails(req: Request, res: Response, next: NextFunction) {
    const result = await this.service.getInvestmentDetails(req.params.userId as string, req.params.investmentId as string);
    res.json(result);
  }
}
