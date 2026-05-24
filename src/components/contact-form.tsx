"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { SubmitButton } from "@/components/ui/button";
import { Field, FieldError, Input, Label, Textarea } from "@/components/ui/form-controls";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      business: "",
      website: "",
      improvement: "",
      aiOpportunity: "",
      companyUrl: ""
    }
  });

  async function onSubmit(values: ContactFormValues) {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const data = (await response.json().catch(() => ({}))) as { message?: string };

    if (!response.ok) {
      const message =
        data.message ||
        "The form could not send. Email Jayme directly at jayme@studiobaggio.ai.";
      toast.error(message);
      throw new Error(message);
    }

    toast.success("Message sent to Studio Baggio.");
    reset();
  }

  return (
    <form className="grid gap-8" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="companyUrl">Company URL</label>
        <input id="companyUrl" tabIndex={-1} autoComplete="off" {...register("companyUrl")} />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Field>
          <Label htmlFor="name" required>Name</Label>
          <Input id="name" autoComplete="name" {...register("name")} />
          <FieldError message={errors.name?.message} />
        </Field>
        <Field>
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          <FieldError message={errors.email?.message} />
        </Field>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Field>
          <Label htmlFor="business" required>Business / firm</Label>
          <Input id="business" autoComplete="organization" {...register("business")} />
          <FieldError message={errors.business?.message} />
        </Field>
        <Field>
          <Label htmlFor="website">Website</Label>
          <Input id="website" type="url" placeholder="https://" {...register("website")} />
          <FieldError message={errors.website?.message} />
        </Field>
      </div>
      <Field>
        <Label htmlFor="improvement" required>What are you trying to improve?</Label>
        <Textarea id="improvement" {...register("improvement")} />
        <FieldError message={errors.improvement?.message} />
      </Field>
      <Field>
        <Label htmlFor="aiOpportunity" required>Where do you think AI could help?</Label>
        <Textarea id="aiOpportunity" {...register("aiOpportunity")} />
        <FieldError message={errors.aiOpportunity?.message} />
      </Field>
      <div className="grid gap-4">
        <SubmitButton disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
          {isSubmitting ? "Sending" : "Send enquiry"}
        </SubmitButton>
        {isSubmitSuccessful ? (
          <p className="text-sm text-ink/60" role="status">
            Thanks. The enquiry has been submitted.
          </p>
        ) : null}
      </div>
    </form>
  );
}
