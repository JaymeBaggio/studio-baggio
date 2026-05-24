import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  business: z.string().trim().min(2, "Please add your business or firm."),
  website: z
    .string()
    .trim()
    .refine((value) => !value || /^https?:\/\/.+\..+/.test(value), {
      message: "Use a full URL, for example https://example.com."
    }),
  improvement: z.string().trim().min(12, "Give Jayme a little more context."),
  aiOpportunity: z.string().trim().min(12, "Tell Jayme where AI might help."),
  companyUrl: z.string().max(0, "Spam check failed.").optional()
});

export type ContactFormValues = z.infer<typeof contactSchema>;
