"use client";

import { useActionState } from "react";
import { submitContactInquiryAction } from "@/lib/actions/contact";
import { budgetRanges } from "@/lib/site";
import { initialFormState } from "@/lib/validation";
import { Button } from "@/components/ui/button";

function fieldError(fieldErrors: Record<string, string[]> | undefined, key: string) {
  return fieldErrors?.[key]?.[0];
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactInquiryAction,
    initialFormState
  );

  return (
    <form action={formAction} className="surface-panel space-y-5 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted">Name</span>
          <input
            name="name"
            type="text"
            placeholder="Mira Patel"
            className="input-shell"
          />
          {fieldError(state.fieldErrors, "name") ? (
            <span className="text-sm text-error">{fieldError(state.fieldErrors, "name")}</span>
          ) : null}
        </label>

        <label className="space-y-2">
          <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="mira@field-notes.studio"
            className="input-shell"
          />
          {fieldError(state.fieldErrors, "email") ? (
            <span className="text-sm text-error">{fieldError(state.fieldErrors, "email")}</span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted">Company</span>
          <input
            name="company"
            type="text"
            placeholder="Field Notes Studio"
            className="input-shell"
          />
        </label>

        <label className="space-y-2">
          <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted">
            Budget range
          </span>
          <select
            name="budgetRange"
            defaultValue=""
            className="select-shell"
          >
            <option value="">Select a range</option>
            {budgetRanges.map((budgetRange) => (
              <option key={budgetRange} value={budgetRange}>
                {budgetRange}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted">
          Project brief
        </span>
        <textarea
          name="message"
          rows={7}
          placeholder="Describe the product, audience, timelines, and what needs to ship first."
          className="textarea-shell"
        />
        <span className="text-[12px] leading-6 text-muted">
          A solid first pass includes goals, deadlines, stack constraints, and where the current product falls short.
        </span>
        {fieldError(state.fieldErrors, "message") ? (
          <span className="text-sm text-error">{fieldError(state.fieldErrors, "message")}</span>
        ) : null}
      </label>

      {state.message ? (
        <p className={state.status === "success" ? "text-sm text-success" : "text-sm text-error"}>
          {state.message}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Send inquiry"}
      </Button>
    </form>
  );
}
