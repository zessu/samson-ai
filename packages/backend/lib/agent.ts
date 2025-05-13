const samson_ul = Bun.env.SAMSON_URL as string;
import { routineType } from "@lib/index";

const x = {
  prompt: "",
  data: "",
};

export const queryAgent = async (data: routineType) => {
  const promptInfo = {
    prompt: Bun.env.SAMSON_PROMPT as string,
    data,
  };

  const payload = {
    messages: [promptInfo],
  };

  return await fetch(samson_ul, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
