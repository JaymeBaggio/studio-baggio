import type { ContactFormValues } from "@/lib/contact-schema";

const siteUrl = "https://www.studiobaggio.ai/";
const studioEmail = "jayme@studiobaggio.ai";

export function buildEnquiryConfirmationEmail(name: ContactFormValues["name"]) {
  const firstName = name.trim().split(/\s+/)[0] || "there";

  const text = [
    `Hi ${firstName},`,
    "",
    "Thank you for your enquiry.",
    "",
    "We have received your details and will review the opportunity you shared.",
    "We will be in touch to arrange next steps.",
    "",
    "While we review it, you can find out more about Studio Baggio and the systems we build:",
    siteUrl,
    "",
    "STUDIO BAGGIO.AI",
    "AI strategy, systems and implementation",
    siteUrl,
    studioEmail
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>Enquiry received</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f4f4;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f4f4; margin:0; padding:0;">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="width:640px; max-width:100%; background:#ffffff; border:1px solid #d8d8d8; border-collapse:collapse;">
            <tr>
              <td style="padding:48px 50px 40px 50px; font-family:Aileron, Arial, Helvetica, sans-serif; color:#111111;">
                <div style="font-size:13px; line-height:1; letter-spacing:5px; text-transform:uppercase; color:#8f8f8f; margin:0 0 26px 0;">Enquiry received</div>

                <h1 style="font-family:Aileron, Arial, Helvetica, sans-serif; font-size:34px; line-height:1.18; font-weight:400; margin:0 0 24px 0; letter-spacing:0; color:#111111;">Thank you for your enquiry.</h1>

                <p style="font-family:Aileron, Arial, Helvetica, sans-serif; font-size:17px; line-height:1.55; font-weight:400; color:#4a4a4a; margin:0 0 20px 0; max-width:500px;">We have received your details and will review the opportunity you shared.</p>

                <p style="font-family:Aileron, Arial, Helvetica, sans-serif; font-size:17px; line-height:1.55; font-weight:400; color:#4a4a4a; margin:0 0 34px 0; max-width:500px;">We will be in touch to arrange next steps.</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f7f9ff; border-left:3px solid #2f66f6; margin:0 0 36px 0;">
                  <tr>
                    <td style="padding:22px 24px; font-family:Aileron, Arial, Helvetica, sans-serif;">
                      <div style="font-size:13px; line-height:1; letter-spacing:4px; text-transform:uppercase; color:#8f8f8f; margin:0 0 14px 0;">While we review it</div>
                      <p style="font-size:16px; line-height:1.55; color:#333333; margin:0 0 16px 0; max-width:450px;">You can find out more about Studio Baggio and the systems we build.</p>
                      <a href="${siteUrl}" style="display:inline-block; color:#2f66f6; font-size:13px; line-height:1; letter-spacing:3.2px; text-transform:uppercase; text-decoration:none; font-weight:700;">Find out more &#8594;</a>
                    </td>
                  </tr>
                </table>

                <div style="height:1px; line-height:1px; background:#dddddd; width:100%; margin:0 0 32px 0;">&nbsp;</div>

                <div style="font-family:Aileron, Arial, Helvetica, sans-serif; font-size:28px; line-height:1; letter-spacing:3px; font-weight:400; color:#111111; margin:0 0 16px 0;">STUDIO BAGGIO<span style="color:#2f66f6;">.</span>AI</div>

                <div style="width:54px; height:3px; line-height:3px; background:#2f66f6; margin:0 0 20px 0;">&nbsp;</div>

                <div style="font-family:Aileron, Arial, Helvetica, sans-serif; font-size:13px; line-height:1.45; letter-spacing:3px; text-transform:uppercase; color:#8b8b8b; max-width:480px; margin:0 0 22px 0;">AI strategy, systems and implementation</div>

                <p style="font-family:Aileron, Arial, Helvetica, sans-serif; font-size:14px; line-height:1.6; color:#5c5c5c; margin:0;">
                  <a href="${siteUrl}" style="color:#111111; text-decoration:none;">studiobaggio.ai</a><br />
                  <a href="mailto:${studioEmail}" style="color:#5c5c5c; text-decoration:none;">${studioEmail}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { html, text };
}
