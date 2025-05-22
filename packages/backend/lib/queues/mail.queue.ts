import { Queue } from "bullmq";
import { workOutEmail, introEmail } from "@lib/index";
import { connection } from "@/lib/connection";

export const mailQueue = () => {
  return new Queue<workOutEmail | introEmail>("sendMail", {
    connection,
  });
};
