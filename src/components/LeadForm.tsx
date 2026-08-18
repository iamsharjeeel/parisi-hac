"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { ctaLabel, formCopy, site } from "@/lib/content";
import { trackLead, createEventId } from "@/lib/analytics";
import {
  attributionForPayload,
  getStoredAttribution,
} from "@/lib/attribution";
import {
  ageBands,
  availabilityOptions,
  isValidEmail,
  isValidName,
  isValidPhone,
  sports,
} from "@/lib/schema";

type Step = 1 | 2;
type Status = "idle" | "submitting" | "success" | "error";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  athleteFirstName: string;
  athleteAgeBand: string;
  sport: string;
  availability: string[];
  notes: string;
  smsConsent: boolean;
  company: string;
};

const emptyValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  athleteFirstName: "",
  athleteAgeBand: "",
  sport: "",
  availability: [],
  notes: "",
  smsConsent: false,
  company: "",
};

type FieldKey = keyof FormValues;

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: Record<string, unknown>,
      ) => string;
      reset: (id: string) => void;
      execute: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}

let turnstileLoader: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (turnstileLoader) return turnstileLoader;
  turnstileLoader = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("turnstile")));
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("turnstile"));
    document.head.appendChild(script);
  });
  return turnstileLoader;
}

function fieldError(key: FieldKey, values: FormValues): string {
  switch (key) {
    case "firstName":
      return isValidName(values.firstName) ? "" : "Enter a first name";
    case "lastName":
      return isValidName(values.lastName) ? "" : "Enter a last name";
    case "email":
      return isValidEmail(values.email) ? "" : "Enter a valid email";
    case "phone":
      return isValidPhone(values.phone) ? "" : "Enter a 10-digit mobile number";
    case "athleteFirstName":
      return isValidName(values.athleteFirstName)
        ? ""
        : "Enter the athlete's first name";
    case "athleteAgeBand":
      return ageBands.includes(values.athleteAgeBand as (typeof ageBands)[number])
        ? ""
        : "Select an age band";
    case "sport":
      return sports.includes(values.sport as (typeof sports)[number])
        ? ""
        : "Select a sport";
    case "availability":
      return values.availability.length > 0 ? "" : "Select at least one time";
    case "notes":
      return values.notes.length > 500 ? "Keep this under 500 characters" : "";
    default:
      return "";
  }
}

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const uid = useId();
  const [step, setStep] = useState<Step>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [renderedAt] = useState(() => Date.now());
  const [eventId] = useState(() => createEventId());
  const tokenRef = useRef("");
  const widgetIdRef = useRef<string | null>(null);
  const widgetEl = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const stepTwoRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const setField = (key: FieldKey, value: FormValues[FieldKey]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const onBlur = (key: FieldKey) => {
    const message = fieldError(key, values);
    setErrors((current) => ({ ...current, [key]: message }));
  };

  const mountTurnstile = useCallback(async () => {
    if (!siteKey || !widgetEl.current || widgetIdRef.current) return;
    try {
      await loadTurnstile();
      if (!window.turnstile || !widgetEl.current) return;
      widgetIdRef.current = window.turnstile.render(widgetEl.current, {
        sitekey: siteKey,
        size: "invisible",
        appearance: "interaction-only",
        callback: (token: string) => {
          tokenRef.current = token;
        },
        "expired-callback": () => {
          tokenRef.current = "";
        },
        "error-callback": () => {
          tokenRef.current = "";
        },
      });
    } catch {
      tokenRef.current = "";
    }
  }, [siteKey]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void mountTurnstile();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [mountTurnstile]);

  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (step === 2) stepTwoRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const waitForToken = async () => {
    if (tokenRef.current) return tokenRef.current;
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.execute(widgetIdRef.current);
    }
    const started = Date.now();
    while (Date.now() - started < 8000) {
      if (tokenRef.current) return tokenRef.current;
      await new Promise((resolve) => window.setTimeout(resolve, 100));
    }
    return tokenRef.current;
  };

  const goNext = () => {
    const keys: FieldKey[] = ["firstName", "lastName", "email", "phone"];
    const nextErrors: Partial<Record<FieldKey, string>> = {};
    for (const key of keys) {
      const message = fieldError(key, values);
      if (message) nextErrors[key] = message;
    }
    setErrors((current) => ({ ...current, ...nextErrors }));
    if (Object.keys(nextErrors).length === 0) setStep(2);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const keys: FieldKey[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "athleteFirstName",
      "athleteAgeBand",
      "sport",
      "availability",
      "notes",
    ];
    const nextErrors: Partial<Record<FieldKey, string>> = {};
    for (const key of keys) {
      const message = fieldError(key, values);
      if (message) nextErrors[key] = message;
    }
    setErrors(nextErrors);

    setStatus("submitting");
    const token = await waitForToken();
    const attr = attributionForPayload(getStoredAttribution());

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          athleteFirstName: values.athleteFirstName,
          athleteAgeBand: values.athleteAgeBand,
          sport: values.sport,
          availability: values.availability,
          notes: values.notes,
          smsConsent: values.smsConsent,
          company: values.company,
          renderedAt,
          turnstileToken: token,
          eventId,
          ...attr,
        }),
      });
      const data = (await response.json()) as { ok?: boolean };
      if (!response.ok || !data.ok) {
        setStatus("error");
        return;
      }
      trackLead(eventId);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const disabled = status === "submitting";

  if (status === "success") {
    return (
      <div className="border border-hairline bg-canvas-card p-6" aria-live="polite">
        <h3
          ref={successRef}
          tabIndex={-1}
          className="display-lg"
        >
          {formCopy.successHeading}
        </h3>
        <p className="body mt-4 max-w-[34rem]">{formCopy.successBody(site.phoneDisplay)}</p>
      </div>
    );
  }

  const inputClass = (key: FieldKey) =>
    `field-input${errors[key] ? " is-invalid" : ""}`;
  const selectClass = (key: FieldKey) =>
    `field-select${errors[key] ? " is-invalid" : ""}`;

  return (
    <div ref={rootRef} className="border border-hairline bg-canvas-card p-6">
      <div className="mb-6 flex gap-2" aria-hidden>
        <div
          className={`h-[2px] flex-1 ${
            step >= 1 ? (compact ? "bg-hairline-strong" : "bg-accent") : "bg-hairline"
          }`}
        />
        <div
          className={`h-[2px] flex-1 ${
            step >= 2 ? (compact ? "bg-hairline-strong" : "bg-accent") : "bg-hairline"
          }`}
        />
      </div>

      <form onSubmit={onSubmit} noValidate>
        <div className="hp-field" aria-hidden="true">
          <label htmlFor={`${uid}-company`}>Company</label>
          <input
            id={`${uid}-company`}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={(event) => setField("company", event.target.value)}
          />
        </div>

        {step === 1 ? (
          <div className="grid gap-4">
            <h3 className="display-md">{formCopy.step1}</h3>
            <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
              <div>
                <label className="field-label" htmlFor={`${uid}-firstName`}>
                  {formCopy.fields.firstName}
                </label>
                <input
                  id={`${uid}-firstName`}
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  className={inputClass("firstName")}
                  value={values.firstName}
                  disabled={disabled}
                  onChange={(event) => setField("firstName", event.target.value)}
                  onBlur={() => onBlur("firstName")}
                  aria-describedby={errors.firstName ? `${uid}-firstName-error` : undefined}
                />
                {errors.firstName ? (
                  <p id={`${uid}-firstName-error`} className="field-error" role="alert">
                    {errors.firstName}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="field-label" htmlFor={`${uid}-lastName`}>
                  {formCopy.fields.lastName}
                </label>
                <input
                  id={`${uid}-lastName`}
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  className={inputClass("lastName")}
                  value={values.lastName}
                  disabled={disabled}
                  onChange={(event) => setField("lastName", event.target.value)}
                  onBlur={() => onBlur("lastName")}
                  aria-describedby={errors.lastName ? `${uid}-lastName-error` : undefined}
                />
                {errors.lastName ? (
                  <p id={`${uid}-lastName-error`} className="field-error" role="alert">
                    {errors.lastName}
                  </p>
                ) : null}
              </div>
            </div>
            <div>
              <label className="field-label" htmlFor={`${uid}-email`}>
                {formCopy.fields.email}
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                autoComplete="email"
                className={inputClass("email")}
                value={values.email}
                disabled={disabled}
                onChange={(event) => setField("email", event.target.value)}
                onBlur={() => onBlur("email")}
                aria-describedby={errors.email ? `${uid}-email-error` : undefined}
              />
              {errors.email ? (
                <p id={`${uid}-email-error`} className="field-error" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>
            <div>
              <label className="field-label" htmlFor={`${uid}-phone`}>
                {formCopy.fields.mobile}
              </label>
              <input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                className={inputClass("phone")}
                value={values.phone}
                disabled={disabled}
                onChange={(event) => setField("phone", event.target.value)}
                onBlur={() => onBlur("phone")}
                aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
              />
              {errors.phone ? (
                <p id={`${uid}-phone-error`} className="field-error" role="alert">
                  {errors.phone}
                </p>
              ) : null}
            </div>
            <button type="button" className="btn-primary w-full" onClick={goNext}>
              {formCopy.continue}
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            <h3 ref={stepTwoRef} tabIndex={-1} className="display-md">
              {formCopy.step2}
            </h3>
            <div>
              <label className="field-label" htmlFor={`${uid}-athleteFirstName`}>
                {formCopy.fields.athleteFirstName}
              </label>
              <input
                id={`${uid}-athleteFirstName`}
                name="athleteFirstName"
                type="text"
                className={inputClass("athleteFirstName")}
                value={values.athleteFirstName}
                disabled={disabled}
                onChange={(event) =>
                  setField("athleteFirstName", event.target.value)
                }
                onBlur={() => onBlur("athleteFirstName")}
                aria-describedby={
                  errors.athleteFirstName
                    ? `${uid}-athleteFirstName-error`
                    : undefined
                }
              />
              {errors.athleteFirstName ? (
                <p
                  id={`${uid}-athleteFirstName-error`}
                  className="field-error"
                  role="alert"
                >
                  {errors.athleteFirstName}
                </p>
              ) : null}
            </div>
            <div>
              <label className="field-label" htmlFor={`${uid}-athleteAgeBand`}>
                {formCopy.fields.athleteAge}
              </label>
              <select
                id={`${uid}-athleteAgeBand`}
                name="athleteAgeBand"
                className={selectClass("athleteAgeBand")}
                value={values.athleteAgeBand}
                disabled={disabled}
                onChange={(event) =>
                  setField("athleteAgeBand", event.target.value)
                }
                onBlur={() => onBlur("athleteAgeBand")}
                aria-describedby={
                  errors.athleteAgeBand ? `${uid}-athleteAgeBand-error` : undefined
                }
              >
                <option value="">Select</option>
                {ageBands.map((band) => (
                  <option key={band} value={band}>
                    {band}
                  </option>
                ))}
              </select>
              {errors.athleteAgeBand ? (
                <p
                  id={`${uid}-athleteAgeBand-error`}
                  className="field-error"
                  role="alert"
                >
                  {errors.athleteAgeBand}
                </p>
              ) : null}
            </div>
            <div>
              <label className="field-label" htmlFor={`${uid}-sport`}>
                {formCopy.fields.sport}
              </label>
              <select
                id={`${uid}-sport`}
                name="sport"
                className={selectClass("sport")}
                value={values.sport}
                disabled={disabled}
                onChange={(event) => setField("sport", event.target.value)}
                onBlur={() => onBlur("sport")}
                aria-describedby={errors.sport ? `${uid}-sport-error` : undefined}
              >
                <option value="">Select</option>
                {sports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
              {errors.sport ? (
                <p id={`${uid}-sport-error`} className="field-error" role="alert">
                  {errors.sport}
                </p>
              ) : null}
            </div>
            <fieldset>
              <legend className="field-label">{formCopy.fields.availability}</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {availabilityOptions.map((option) => {
                  const on = values.availability.includes(option);
                  return (
                    <label
                      key={option}
                      className={`choice-block${on ? " is-on" : ""}`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={on}
                        disabled={disabled}
                        onChange={() => {
                          const next = on
                            ? values.availability.filter((item) => item !== option)
                            : [...values.availability, option];
                          setField("availability", next);
                        }}
                        onBlur={() => onBlur("availability")}
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
              {errors.availability ? (
                <p className="field-error" role="alert">
                  {errors.availability}
                </p>
              ) : null}
            </fieldset>
            <div>
              <label className="field-label" htmlFor={`${uid}-notes`}>
                {formCopy.fields.notes}
              </label>
              <textarea
                id={`${uid}-notes`}
                name="notes"
                rows={4}
                className={`field-textarea${errors.notes ? " is-invalid" : ""}`}
                value={values.notes}
                disabled={disabled}
                maxLength={500}
                onChange={(event) => setField("notes", event.target.value)}
                onBlur={() => onBlur("notes")}
                aria-describedby={`${uid}-notes-count`}
              />
              <p id={`${uid}-notes-count`} className="mt-2 text-[13px] text-muted">
                {values.notes.length}/500
              </p>
            </div>
            <label className="flex items-start gap-3 text-[13px] text-muted">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 border border-hairline bg-canvas-card"
                style={{ accentColor: "var(--accent)" }}
                checked={values.smsConsent}
                disabled={disabled}
                onChange={(event) => setField("smsConsent", event.target.checked)}
              />
              <span>
                {formCopy.consent}{" "}
                <a href="/sms-terms" className="text-accent-bright underline">
                  SMS Terms
                </a>
              </span>
            </label>
            <p className="body text-muted">{formCopy.expectation}</p>
            {status === "error" ? (
              <p className="field-error" role="alert" aria-live="polite">
                {formCopy.errorBody(site.phoneDisplay)}
              </p>
            ) : null}
            <div className="flex flex-col gap-3">
              <button type="submit" className="btn-primary w-full" disabled={disabled}>
                {disabled ? formCopy.sending : ctaLabel}
              </button>
              <button
                type="button"
                className="btn-ghost w-full"
                disabled={disabled}
                onClick={() => setStep(1)}
              >
                {formCopy.back}
              </button>
            </div>
          </div>
        )}
        <div ref={widgetEl} className="mt-2" />
      </form>
    </div>
  );
}
