const samson_ul = Bun.env.SAMSON_URL as string;
import { routineType } from "@lib/index";

export const queryAgent = async (data: routineType) => {
  const payload = {
    messages: [
      {
        role: "user",
        content:
          (Bun.env.SAMSON_PROMPT as string) +
          "Needed User data is" +
          JSON.stringify(data),
      },
    ],
  };

  return await fetch(samson_ul, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
