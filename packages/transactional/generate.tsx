import { DailyWorkoutsTemplate } from "./emails/dailyWorkout";
import { render, pretty } from "@react-email/render";

const html = await pretty(await render(<DailyWorkoutsTemplate />));

console.log(html);
