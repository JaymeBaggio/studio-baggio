"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { identifyVisitor, postHogDistinctId } from "@/lib/posthog";
import { Loader2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { enquiryTimings, enquiryTypes } from "@/content/site";

// Older links use ?intent=ai-search-audit; newer ones use ?type=<enquiry type>.
const intentToType: Record<string, string> = { "ai-search-audit": "seo-ai-search" };
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
    setValue,
    control,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    // Validate a field once it has been left, then live while it is corrected.
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      business: "",
      website: "",
      workTypes: [],
      brief: "",
      timing: "",
      companyUrl: ""
    }
  });
  const workTypes = useWatch({ control, name: "workTypes" }) ?? [];
  const timing = useWatch({ control, name: "timing" }) ?? "";

  // A link from a service, article or study preselects the type of work.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("type") ?? intentToType[params.get("intent") ?? ""];
    if (requested && enquiryTypes.some((option) => option.type === requested)) {
      setValue("workTypes", [requested]);
    }
  }, [setValue]);

  function toggleWorkType(type: string) {
    const next = workTypes.includes(type) ? workTypes.filter((value) => value !== type) : [...workTypes, type];
    setValue("workTypes", next, { shouldDirty: true });
  }

  async function onSubmit(values: ContactFormValues) {
    setFormStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, posthogDistinctId: postHogDistinctId() })
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

      identifyVisitor(values.email, { name: values.name, firm_name: values.business, source: "Website enquiry" });
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
    const count = Object.keys(fieldErrors).length;
    setFormStatus({
      tone: "error",
      message: count === 1 ? "One field needs attention above." : `${count} fields need attention above.`
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
          <Input id="name" autoComplete="name" aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
          <FieldError id="name-error" message={errors.name?.message} />
        </Field>
        <Field>
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" type="email" autoComplete="email" aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
          <FieldError id="email-error" message={errors.email?.message} />
        </Field>
        <Field>
          <Label htmlFor="business" required>Company name</Label>
          <Input id="business" autoComplete="organization" aria-invalid={errors.business ? true : undefined} aria-describedby={errors.business ? "business-error" : undefined} {...register("business")} />
          <FieldError id="business-error" message={errors.business?.message} />
        </Field>
        <Field>
          <Label htmlFor="website">Website</Label>
          <Input id="website" type="url" placeholder="https://" aria-invalid={errors.website ? true : undefined} aria-describedby={errors.website ? "website-error" : undefined} {...register("website")} />
          <FieldError id="website-error" message={errors.website?.message} />
        </Field>
      </div>

      <div className="contact-form-choice" role="group" aria-labelledby="contact-work-type-label">
        <p className="contact-form-choice-label" id="contact-work-type-label">
          Type of work <span>Choose any that apply</span>
        </p>
        <div className="contact-form-chips">
          {enquiryTypes.map((option) => {
            const selected = workTypes.includes(option.type);
            return (
              <button
                key={option.type}
                type="button"
                className={`contact-form-chip${selected ? " is-selected" : ""}`}
                aria-pressed={selected}
                onClick={() => toggleWorkType(option.type)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <Field>
        <Label htmlFor="brief">Brief</Label>
        <Textarea id="brief" placeholder="A few lines on what you need." aria-invalid={errors.brief ? true : undefined} aria-describedby={errors.brief ? "brief-error" : undefined} {...register("brief")} />
        <FieldError id="brief-error" message={errors.brief?.message} />
      </Field>

      <div className="contact-form-choice" role="radiogroup" aria-labelledby="contact-timing-label">
        <p className="contact-form-choice-label" id="contact-timing-label">
          Timing
        </p>
        <div className="contact-form-chips">
          {enquiryTimings.map((option) => {
            const selected = timing === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`contact-form-chip${selected ? " is-selected" : ""}`}
                onClick={() => setValue("timing", selected ? "" : option, { shouldDirty: true })}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

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
