import { Router } from "express";
import { InvestmentsController } from "../investments/investments.controller";
import { InvestmentsService } from "../investments/investments.service";
import { InvestmentsRepository } from "../investments/investments.repository";
import { MockPriceProvider } from "../pricing/mock-price-provider";
import { asyncHandler } from "../shared/middleware/async-handler";

const router = Router();

const investmentsRepo = new InvestmentsRepository();
const priceProvider = new MockPriceProvider();
const service = new InvestmentsService(investmentsRepo, priceProvider, () => new Date());
const controller = new InvestmentsController(service);

router.get("/users/:userId/investments",
  asyncHandler((req, res, next) => controller.getInvestmentsByUser(req, res, next)));


router.get(
  "/users/:userId/investments/:investmentId",
  asyncHandler((req, res, next) => controller.getInvestmentDetails(req, res, next)));

export default router;