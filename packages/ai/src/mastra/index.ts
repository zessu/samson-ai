import { Mastra } from "@mastra/core";

import { Samson } from "./agents/samson";

export const mastra = new Mastra({
  agents: { Samson },
});
