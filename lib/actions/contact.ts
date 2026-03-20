"use server";

import { revalidatePath } from "next/cache";
import { createContactInquiry } from "@/lib/repository";
import {
  contactSchema,
  initialFormState,
  type FormState,
  validationErrorState
} from "@/lib/validation";

export async function submitContactInquiryAction(
  previousState: FormState = initialFormState,
  formData: FormData
): Promise<FormState> {
  void previousState;

  const result = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    budgetRange: formData.get("budgetRange") || undefined,
    message: formData.get("message")
  });

  if (!result.success) {
    return validationErrorState(result.error);
  }

  try {
    await createContactInquiry(result.data);

    revalidatePath("/contact");
    revalidatePath("/admin/inquiries");

    return {
      status: "success",
      message: "Inquiry captured. I will follow up with a concrete response."
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message:
        "Inquiry storage is unavailable right now. Configure Postgres or enable demo mode for local preview."
    };
  }
}
