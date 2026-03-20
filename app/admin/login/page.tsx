import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/login-form";
import { buildMetadata } from "@/lib/seo";
import { appEnv, isSupabaseConfigured } from "@/lib/env";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams?: Promise<{
    reason?: string;
  }>;
};

export const metadata: Metadata = buildMetadata({
  title: "Admin Login",
  description: "Admin access for subscribers and contact inquiries.",
  path: "/admin/login"
});

const reasonCopy: Record<string, string> = {
  auth: "Sign in with the seeded admin email to access the protected admin routes.",
  role: "That session is authenticated, but it does not map to an admin profile.",
  config: "Supabase auth is not configured. Add the auth environment variables before testing magic-link login."
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const reason = resolvedSearchParams?.reason ?? "";

  return (
    <div className="mx-auto max-w-[1120px] px-4 py-10 sm:px-6 lg:px-10">
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-panel p-6">
          <p className="eyebrow">admin / login</p>
          <h1 className="mt-4 text-[2.7rem] font-semibold tracking-[-0.06em] text-ink">
            Protected views for subscribers and inbound client work.
          </h1>
          <p className="mt-4 max-w-xl text-[13px] leading-7 text-muted">
            Auth is handled with Supabase magic links. Route protection happens server-side and
            access is authorized against the Prisma-backed admin profile.
          </p>
        </div>

        <div className="space-y-4">
          <LoginForm />
          <div className="surface-panel-muted p-6 text-[13px] leading-7 text-muted">
            <p className="eyebrow">setup / notes</p>
            <p className="mt-3">
              Seeded admin email: <span className="font-mono text-ink">{appEnv.adminEmail}</span>
            </p>
            <p className="mt-3">
              {reason ? reasonCopy[reason] ?? reasonCopy.auth : reasonCopy.auth}
            </p>
            {!isSupabaseConfigured() ? (
              <p className="mt-3 text-error">
                Supabase credentials are missing in this environment, so the login form will surface
                a configuration error until they are added.
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
