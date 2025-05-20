import { Resend } from "resend";
import { introEmail } from "@lib/index";

export const sendIntroEmail = async (jobData: introEmail) => {
  const resend = new Resend(Bun.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    // to: res[0].email, //TODO: change this once you validate your domain
    to: Bun.env.TEST_DOMAIN as string,
    subject: "Hi there, Welcome to SAMSON AI",
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://i.ibb.co/yFdMngnS/samson.webp" />
    <link
      rel="preload"
      as="image"
      href="https://react.email/static/instagram-logo.png " />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
  </head>
  <body
    style='background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'>
    <!--$-->
    <div
      style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
      data-skip-in-text="true">
      Welcome to SAMSON – Your AI Personal Trainer is Ready!
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:37.5em;margin:0 auto;padding:20px 0 48px">
      <tbody>
        <tr style="width:100%">
          <td>
            <img
              alt="SAMSON Logo"
              height="50"
              src="https://i.ibb.co/yFdMngnS/samson.webp"
              style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto"
              width="50" />
            <p
              style="font-size:16px;line-height:26px;margin-top:16px;margin-bottom:16px">
              Hi <strong>There</strong>,
            </p>
            <p
              style="font-size:16px;line-height:26px;margin-top:16px;margin-bottom:16px">
              Welcome to <strong>SAMSON</strong> – your AI-powered personal
              trainer designed to help you reach your fitness goals smarter and
              faster than ever before! 💪🤖
            </p>
            <p
              style="font-size:16px;line-height:26px;margin-top:16px;margin-bottom:16px">
              Whether you&#x27;re just starting out or looking to level up your
              fitness journey, Samson will create personalized workouts,
              nutrition plans, and daily guidance tailored just for you.
            </p>
            <p
              style="font-size:16px;line-height:26px;margin-top:16px;margin-bottom:16px">
              Here’s what you can expect:
            </p>
            <p
              style="font-size:16px;line-height:26px;margin-top:16px;margin-bottom:16px">
              🏋️‍♀️ <strong>Custom Workouts:</strong> Built around your goals,
              fitness level, and equipment<br />🥗
              <strong>Nutrition Guidance:</strong> Designed to match your
              lifestyle and dietary preferences<br />📈
              <strong>Progress Tracking:</strong> Adapts as you grow stronger
              and hit milestones<br />🔔 <strong>Daily Motivation:</strong> From
              Samson himself — to keep you consistent and motivated
            </p>
            <p
              style="font-size:16px;line-height:26px;margin-top:16px;margin-bottom:16px">
              We are currently working on a dashboard where you can personalise
              your settings, track your metrics and chat directly with Samson.
              Once that is done, we will notify you via email. For now, you will
              still receive all your expected workouts via email everyday an
              hour before your next workout.
            </p>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="text-align:center;width:100px">
              <tbody>
                <tr>
                  <td>
                    <a
                      href="https://yourapp.com/open "
                      style="line-height:100%;text-decoration:none;display:block;max-width:100%;mso-padding-alt:0px;background-color:#000;border-radius:3px;color:#fff;font-size:16px;text-align:center;padding:12px 12px 12px 12px"
                      target="_blank"
                      ><span
                        ><!--[if mso]><i style="mso-font-width:300%;mso-text-raise:18" hidden>&#8202;&#8202;</i><![endif]--></span
                      ><span
                        style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px"
                        >Open App</span
                      ><span
                        ><!--[if mso]><i style="mso-font-width:300%" hidden>&#8202;&#8202;&#8203;</i><![endif]--></span
                      ></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style="font-size:16px;line-height:26px;margin-top:16px;margin-bottom:16px">
              We’re rooting for you — and so is Samson 😉<br />Let’s crush those
              goals together!
            </p>
            <p
              style="font-size:16px;line-height:26px;margin-top:16px;margin-bottom:16px">
              The SAMSON Team
            </p>
            <hr
              style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
            <p
              style="font-size:12px;line-height:24px;color:#8898aa;margin-top:16px;margin-bottom:16px">
              P.S. Got questions or feedback? Just reply to this email — we’d
              love to hear from you!
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:600px;margin:0 auto;padding:40px 20px;background-color:rgb(45, 24, 83);color:#fff">
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation">
              <tbody style="width:100%">
                <tr style="width:100%">
                  <td colspan="4" data-id="__react-email-column">
                    <p
                      style="font-size:18px;line-height:24px;margin:0;font-weight:bold;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                      SAMSON
                    </p>
                    <p
                      style="font-size:16px;line-height:24px;margin-top:4px;font-weight:bold;margin-bottom:16px">
                      Your personal AI fitness trainer
                    </p>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td
                            data-id="__react-email-column"
                            style="display:inline-block;vertical-align:middle">
                            <a
                              href="https://instagram.com/your.samson "
                              style="color:#067df7;text-decoration-line:none"
                              target="_blank"
                              ><img
                                alt="Instagram"
                                height="36"
                                src="https://react.email/static/instagram-logo.png "
                                style="display:block;outline:none;border:none;text-decoration:none"
                                width="36"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <p
                            style="font-size:14px;line-height:24px;margin:16px 0 4px 0;font-weight:600;margin-top:16px;margin-right:0;margin-bottom:4px;margin-left:0">
                            Made For You With ♥️
                          </p>
                          <p
                            style="font-size:14px;line-height:24px;margin:0;font-weight:600;margin-top:0;margin-bottom:0;margin-left:0;margin-right:0">
                            Contact Email: plant-shirt-chemo@duck.com
                          </p>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--7--><!--/$-->
  </body>
</html>
`,
  });
};
