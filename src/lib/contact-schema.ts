import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  business: z.string().trim().min(2, "Please add your business or firm."),
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
  improvement: z.string().trim().min(2, "Please add what you want to improve."),
  aiOpportunity: z.string().trim().min(2, "Please add what would make this useful."),
  companyUrl: z.string().max(0, "Spam check failed.").optional()
});

export type ContactFormValues = z.infer<typeof contactSchema>;
