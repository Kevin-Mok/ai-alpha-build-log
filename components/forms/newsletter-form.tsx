"use client";

import { useActionState } from "react";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { subscribeAction } from "@/lib/actions/newsletter";
import { initialFormState } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  source: string;
  className?: string;
};

export function NewsletterForm({ source, className }: NewsletterFormProps) {
  const [state, formAction, pending] = useActionState(subscribeAction, initialFormState);

  return (
    <form action={formAction} className={cn("space-y-3", className)}>
      <input type="hidden" name="source" value={source} />
      <label className="block space-y-2">
        <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted">
          Newsletter email
        </span>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <EnvelopeSimple
              size={16}
              weight="bold"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="kevin@studio.dev"
              className="input-shell px-10"
            />
          </div>
          <Button type="submit" disabled={pending} className="min-w-36">
            {pending ? "Saving..." : "Join"}
          </Button>
        </div>
      </label>
      <p className="text-[12px] leading-6 text-muted">
        Product essays, build logs, and technical writing experiments. Capture-only in v1.
      </p>
      {state.message ? (
        <p className={state.status === "success" ? "text-sm text-success" : "text-sm text-error"}>
          {state.message}
        </p>
      ) : null}
      {state.fieldErrors?.email ? <p className="text-sm text-error">{state.fieldErrors.email[0]}</p> : null}
    </form>
  );
}
