import * as LabelPrimitive from "@radix-ui/react-label";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Field({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function Label({
  children,
  htmlFor,
  required
}: {
  children: ReactNode;
  htmlFor: string;
  required?: boolean;
}) {
  return (
    <LabelPrimitive.Root
      htmlFor={htmlFor}
      className="text-sm uppercase tracking-[0.06em] text-ink/70"
    >
      {children}
      {required ? <span aria-hidden="true"> *</span> : null}
    </LabelPrimitive.Root>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "focus-ring min-h-12 w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink/35 focus:border-ink focus:ring-0",
        props.className
      )}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "focus-ring min-h-32 w-full resize-y border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base leading-relaxed text-ink placeholder:text-ink/35 focus:border-ink focus:ring-0",
        props.className
      )}
    />
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-ink" role="alert">{message}</p>;
}
