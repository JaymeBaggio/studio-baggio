"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { SubmitButton } from "@/components/ui/button";
import { Field, FieldError, Input, Label, Textarea } from "@/components/ui/form-controls";

export function ContactForm() {
  const [formStatus, setFormStatus] = useState<{
    tone: "success" | "error";
    message: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
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
    setFormStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      const data = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        const message =
          data.message ||
          "The form could not send. Email jayme@studiobaggio.ai directly.";
        toast.error(message);
        setFormStatus({ tone: "error", message });
        return;
      }

      toast.success("Message sent to Studio Baggio.");
      setFormStatus({
        tone: "success",
        message: "Thank you for your enquiry. We'll review your details and be in touch with next steps."
      });
      reset();
    } catch {
      const message = "The form could not send. Email jayme@studiobaggio.ai directly.";
      toast.error(message);
      setFormStatus({ tone: "error", message });
    }
  }

  function onInvalid(fieldErrors: FieldErrors<ContactFormValues>) {
    const message =
      fieldErrors.name?.message ||
      fieldErrors.email?.message ||
      fieldErrors.business?.message ||
      fieldErrors.website?.message ||
      fieldErrors.improvement?.message ||
      fieldErrors.aiOpportunity?.message ||
      "Please check the fields above and try again.";

    setFormStatus({
      tone: "error",
      message: typeof message === "string" ? message : "Please check the fields above and try again."
    });
  }

  return (
    <form className="grid gap-8" onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
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
      <div className="grid gap-8 md:grid-cols-2">
        <Field>
          <Label htmlFor="improvement" required>What are you trying to improve?</Label>
          <Textarea id="improvement" {...register("improvement")} />
          <FieldError message={errors.improvement?.message} />
        </Field>
        <Field>
          <Label htmlFor="aiOpportunity" required>Tell us what would make this useful.</Label>
          <Textarea id="aiOpportunity" {...register("aiOpportunity")} />
          <FieldError message={errors.aiOpportunity?.message} />
        </Field>
      </div>
      <div className="grid gap-4">
        <SubmitButton disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
          {isSubmitting ? "Sending" : "Send enquiry"}
        </SubmitButton>
        {formStatus ? (
          <p
            className={formStatus.tone === "success" ? "studio-contact-status is-success" : "studio-contact-status is-error"}
            role={formStatus.tone === "success" ? "status" : "alert"}
          >
            {formStatus.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
