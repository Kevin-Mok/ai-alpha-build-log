import { redirect } from "next/navigation";
import { ProfileRole } from "@prisma/client";
import { isAuthBypassed, isSupabaseConfigured } from "@/lib/env";
import { getProfileByEmail } from "@/lib/repository";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AdminContext = {
  email: string;
  fullName: string;
};

export async function requireAdmin(): Promise<AdminContext> {
  if (isAuthBypassed()) {
    return {
      email: "preview@aiblog.dev",
      fullName: "Preview Admin"
    };
  }

  if (!isSupabaseConfigured()) {
    redirect("/admin/login?reason=config");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/admin/login?reason=auth");
  }

  const profile = await getProfileByEmail(user.email);

  if (!profile || profile.role !== ProfileRole.ADMIN) {
    redirect("/admin/login?reason=role");
  }

  return {
    email: profile.email,
    fullName: profile.fullName
  };
}
