import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  business: z.string().trim().min(2, "Please add your company name."),
  website: z
    .string()
    .trim()
    .transform((value) => {
      if (!value || /^https?:\/\//i.test(value)) return value;
      return `https://${value}`;
    })
    .refine((value) => !value || /^https?:\/\/.+\..+/.test(value), {
      message: "Add a valid website, for example studiobaggio.ai."
    }),
  biggestChallenge: z.string().trim().max(1200, "Keep this under 1,200 characters.").optional(),
  alreadyTried: z.string().trim().max(1200, "Keep this under 1,200 characters.").optional(),
  whyNow: z.string().trim().max(1200, "Keep this under 1,200 characters.").optional(),
  successfulOutcome: z.string().trim().max(1200, "Keep this under 1,200 characters.").optional(),
  companyUrl: z.string().max(0, "Spam check failed.").optional()
});

export type ContactFormValues = z.infer<typeof contactSchema>;
