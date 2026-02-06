import express from "express";
import investmentsRoutes from "./routes/investments.routes";
import { globalErrorHandler } from "./shared/middleware/error-handler";
import { requestLogger } from "./shared/middleware/logger-handler";

export function createApp() {
  const app = express();

  app.use(express.json());
  
  // Log all incoming requests
  app.use(requestLogger);
  
  app.use("/api", investmentsRoutes);

  app.use(globalErrorHandler);

  return app;
}
