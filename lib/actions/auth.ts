"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { appEnv, isAuthBypassed, isSupabaseConfigured } from "@/lib/env";
import { getProfileByEmail } from "@/lib/repository";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  adminLoginSchema,
  initialFormState,
  type FormState,
  validationErrorState
} from "@/lib/validation";

export async function requestAdminLoginAction(
  previousState: FormState = initialFormState,
  formData: FormData
): Promise<FormState> {
  void previousState;

  const result = adminLoginSchema.safeParse({
    email: formData.get("email")
  });

  if (!result.success) {
    return validationErrorState(result.error);
  }

  const adminProfile = await getProfileByEmail(result.data.email);

  if (!adminProfile) {
    return {
      status: "error",
      message: "That email is not authorized for admin access."
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message: "Supabase auth is not configured yet. Add the auth environment variables first."
    };
  }

  try {
    const supabase = await createSupabaseServerClient();
    const headerList = await headers();
    const origin = headerList.get("origin") ?? appEnv.siteUrl;

    const { error } = await supabase.auth.signInWithOtp({
      email: result.data.email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${origin}/admin/subscribers`
      }
    });

    if (error) {
      throw error;
    }

    return {
      status: "success",
      message: "Magic link sent. Open it on this device to finish the admin session."
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message: "Could not send the admin login link. Check the Supabase auth setup and try again."
    };
  }
}

export async function logoutAction() {
  if (isAuthBypassed()) {
    redirect("/admin/login");
  }

  if (!isSupabaseConfigured()) {
    redirect("/admin/login?reason=config");
  }

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
