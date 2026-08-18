import { z } from "zod";

export const ageBands = ["5-8", "9-11", "12-14", "15-18"] as const;
export const sports = [
  "Football",
  "Soccer",
  "Basketball",
  "Lacrosse",
  "Baseball or Softball",
  "Track and field",
  "Other or multi-sport",
] as const;
export const availabilityOptions = [
  "Weekday afternoons",
  "Weekday evenings",
  "Saturday morning",
  "Saturday afternoon",
] as const;

const namePattern = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/;

export const nameField = z
  .string()
  .trim()
  .min(1)
  .max(50)
  .regex(namePattern);

export function normalizeUsPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

export function isValidName(value: string): boolean {
  return nameField.safeParse(value).success;
}

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function isValidPhone(value: string): boolean {
  return normalizeUsPhone(value) !== null;
}

const attrValue = z
  .string()
  .optional()
  .transform((v) => (v ?? "").replace(/[^A-Za-z0-9_\-.]/g, "").slice(0, 100));

export const leadSchema = z
  .object({
    firstName: nameField,
    lastName: nameField,
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1)
      .max(254)
      .email(),
    phone: z.string().transform((val, ctx) => {
      const normalised = normalizeUsPhone(val);
      if (!normalised) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid phone" });
        return z.NEVER;
      }
      return normalised;
    }),
    athleteFirstName: nameField,
    athleteAgeBand: z.enum(ageBands),
    sport: z.enum(sports),
    availability: z.array(z.enum(availabilityOptions)).min(1),
    notes: z.string().max(500).optional().default(""),
    smsConsent: z.boolean(),
    turnstileToken: z.string().min(1),
    eventId: z.string().uuid(),
    utmSource: attrValue,
    utmMedium: attrValue,
    utmCampaign: attrValue,
    utmContent: attrValue,
    utmTerm: attrValue,
    fbclid: attrValue,
    landingPath: attrValue,
    referrer: attrValue,
  })
  .strict();

export type LeadInput = z.input<typeof leadSchema>;
export type LeadPayload = z.output<typeof leadSchema>;
