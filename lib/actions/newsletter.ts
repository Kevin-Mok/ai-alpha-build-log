"use server";

import { revalidatePath } from "next/cache";
import { createOrUpdateSubscriber } from "@/lib/repository";
import {
  initialFormState,
  newsletterSchema,
  type FormState,
  validationErrorState
} from "@/lib/validation";

export async function subscribeAction(
  previousState: FormState = initialFormState,
  formData: FormData
): Promise<FormState> {
  void previousState;

  const result = newsletterSchema.safeParse({
    email: formData.get("email"),
    source: formData.get("source") ?? "newsletter"
  });

  if (!result.success) {
    return validationErrorState(result.error);
  }

  try {
    const { duplicate, reactivated } = await createOrUpdateSubscriber(result.data);

    revalidatePath("/");
    revalidatePath("/admin/subscribers");

    return {
      status: "success",
      message: duplicate
        ? "That address is already on the list."
        : reactivated
          ? "Subscription restored. You are back on the list."
          : "Subscribed. New essays and build notes will land in your inbox."
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message:
        "Subscription storage is unavailable right now. Configure Postgres or enable demo mode for local preview."
    };
  }
}
