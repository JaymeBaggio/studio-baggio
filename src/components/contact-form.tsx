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
      biggestChallenge: "",
      alreadyTried: "",
      whyNow: "",
      successfulOutcome: "",
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
      fieldErrors.biggestChallenge?.message ||
      fieldErrors.alreadyTried?.message ||
      fieldErrors.whyNow?.message ||
      fieldErrors.successfulOutcome?.message ||
      "Please check the fields above and try again.";

    setFormStatus({
      tone: "error",
      message: typeof message === "string" ? message : "Please check the fields above and try again."
    });
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="companyUrl">Company URL</label>
        <input id="companyUrl" tabIndex={-1} autoComplete="off" {...register("companyUrl")} />
      </div>
      <div className="contact-form-grid">
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
        <Field>
          <Label htmlFor="business" required>Company name</Label>
          <Input id="business" autoComplete="organization" {...register("business")} />
          <FieldError message={errors.business?.message} />
        </Field>
        <Field>
          <Label htmlFor="website">Website</Label>
          <Input id="website" type="url" placeholder="https://" {...register("website")} />
          <FieldError message={errors.website?.message} />
        </Field>
      </div>

      <details className="contact-form-optional">
        <summary>
          <span className="contact-form-optional-label">Add optional context</span>
          <small>These help us prepare before we speak with your team.</small>
          <span className="contact-form-optional-icon" aria-hidden="true">+</span>
        </summary>
        <div className="contact-form-grid contact-form-grid-briefing">
          <Field>
            <Label htmlFor="biggestChallenge">What is the biggest challenge you’re trying to solve right now?</Label>
            <Textarea id="biggestChallenge" {...register("biggestChallenge")} />
            <FieldError message={errors.biggestChallenge?.message} />
          </Field>
          <Field>
            <Label htmlFor="alreadyTried">What have you already tried?</Label>
            <Textarea id="alreadyTried" {...register("alreadyTried")} />
            <FieldError message={errors.alreadyTried?.message} />
          </Field>
          <Field>
            <Label htmlFor="whyNow">Why is now the right time to address this?</Label>
            <Textarea id="whyNow" {...register("whyNow")} />
            <FieldError message={errors.whyNow?.message} />
          </Field>
          <Field>
            <Label htmlFor="successfulOutcome">What would a successful outcome look like for your business 6 months from now?</Label>
            <Textarea id="successfulOutcome" {...register("successfulOutcome")} />
            <FieldError message={errors.successfulOutcome?.message} />
          </Field>
        </div>
      </details>

      <div className="contact-form-actions">
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
