import { z } from "zod";
import { enquiryTimings, enquiryTypes } from "@/content/site";

const typeValues = enquiryTypes.map((option) => option.type) as [string, ...string[]];

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
  workTypes: z.array(z.enum(typeValues)).max(typeValues.length).optional(),
  brief: z.string().trim().max(1500, "Keep this under 1,500 characters.").optional(),
  timing: z.union([z.enum(enquiryTimings), z.literal("")]).optional(),
  companyUrl: z.string().max(0, "Spam check failed.").optional()
});

export type ContactFormValues = z.infer<typeof contactSchema>;
