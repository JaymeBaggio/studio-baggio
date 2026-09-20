import { z } from "zod";

const freeMailDomains = new Set([
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "hotmail.co.uk",
  "outlook.com",
  "outlook.co.uk",
  "live.com",
  "live.co.uk",
  "yahoo.com",
  "yahoo.co.uk",
  "icloud.com",
  "me.com",
  "aol.com",
  "protonmail.com",
  "proton.me",
  "btinternet.com",
  "sky.com"
]);

export function isWorkEmail(email: string) {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  return domain.length > 0 && !freeMailDomains.has(domain);
}

export const datasetInterestSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .refine(isWorkEmail, { message: "Please use your work email." }),
  firm: z.string().trim().max(160, "Keep this under 160 characters.").optional(),
  role: z.string().trim().max(120, "Keep this under 120 characters.").optional(),
  variant: z.enum(["section", "inline"]).default("section"),
  companyUrl: z.string().max(0, "Spam check failed.").optional()
});

export type DatasetInterestValues = z.infer<typeof datasetInterestSchema>;
