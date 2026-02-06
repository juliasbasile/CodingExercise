import { Router } from "express";
import investmentsRoutes from "./investments.routes";

const router = Router();

router.use("/", investmentsRoutes);

export default router;
