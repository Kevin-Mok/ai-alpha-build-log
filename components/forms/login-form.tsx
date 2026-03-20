"use client";

import { useActionState } from "react";
import { requestAdminLoginAction } from "@/lib/actions/auth";
import { initialFormState } from "@/lib/validation";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    requestAdminLoginAction,
    initialFormState
  );

  return (
    <form action={formAction} className="surface-panel space-y-4 p-6">
      <label className="space-y-2">
        <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted">
          Admin email
        </span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="admin@example.com"
          className="input-shell"
        />
      </label>
      {state.fieldErrors?.email ? (
        <p className="text-sm text-error">{state.fieldErrors.email[0]}</p>
      ) : null}
      {state.message ? (
        <p className={state.status === "success" ? "text-sm text-success" : "text-sm text-error"}>
          {state.message}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send magic link"}
      </Button>
    </form>
  );
}
