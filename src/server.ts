import { createApp } from "./index.js";
import { Logger } from "./shared/logging/logger.js";

const port = process.env.PORT || 3000;
const app = createApp();

app.listen(port, () => {
  Logger.info(`Server listening on port ${port}`);
});
