import { z } from "zod";
import { budgetRanges } from "@/lib/site";
import { normalizeEmail } from "@/lib/utils";

const optionalTrimmedString = z
  .string()
  .transform((value) => value.trim())
  .transform((value) => (value.length > 0 ? value : undefined))
  .optional();

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .transform((value) => normalizeEmail(value)),
  source: z
    .string()
    .trim()
    .min(2, "Source is required.")
    .max(60, "Source must be shorter than 60 characters.")
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .transform((value) => normalizeEmail(value)),
  company: optionalTrimmedString,
  budgetRange: z.enum(budgetRanges).optional(),
  message: z
    .string()
    .trim()
    .min(24, "Share enough detail for me to assess the project.")
    .max(2000, "Message must stay under 2000 characters.")
});

export const adminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter the admin email address.")
    .transform((value) => normalizeEmail(value))
});

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export const initialFormState: FormState = {
  status: "idle"
};

export function validationErrorState(error: z.ZodError): FormState {
  const fieldErrors = Object.fromEntries(
    Object.entries(error.flatten().fieldErrors).filter(([, value]) => value !== undefined)
  ) as Record<string, string[]>;

  return {
    status: "error",
    message: "Please fix the highlighted fields and try again.",
    fieldErrors
  };
}
