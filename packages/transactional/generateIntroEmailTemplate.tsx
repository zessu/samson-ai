import { IntroEmailTemplate } from "./emails/introEmail";
import { render, pretty } from "@react-email/render";

const html = await pretty(await render(<IntroEmailTemplate />));

console.log(html);
