"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionary";

type FormDict = Dictionary["discovery"]["form"];

export function DiscoveryForm({ t }: { t: FormDict }) {
  const [submitted, setSubmitted] = useState(false);
  const f = t.fields;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to backend / CRM. For now this is a client-side confirmation.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="w-full max-w-[480px] rounded-sm border border-line bg-surface p-8">
        <h3 className="t-h3 text-ink">{t.successTitle}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          {t.successBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[480px] flex-col gap-4"
      noValidate
    >
      <Field label={f.name}>
        <input
          className="field-input"
          name="name"
          placeholder={f.namePlaceholder}
          autoComplete="name"
          required
        />
      </Field>
      <Field label={f.company}>
        <input
          className="field-input"
          name="company"
          placeholder={f.companyPlaceholder}
          autoComplete="organization"
          required
        />
      </Field>
      <Field label={f.role}>
        <input
          className="field-input"
          name="role"
          placeholder={f.rolePlaceholder}
          autoComplete="organization-title"
          required
        />
      </Field>
      <Field label={f.email}>
        <input
          className="field-input"
          type="email"
          name="email"
          placeholder={f.emailPlaceholder}
          autoComplete="email"
          required
        />
      </Field>
      <Field label={f.phone}>
        <input
          className="field-input"
          type="tel"
          name="phone"
          placeholder={f.phonePlaceholder}
          autoComplete="tel"
          required
        />
      </Field>
      <Field label={f.sector}>
        <div className="relative">
          <select
            className="field-input appearance-none pr-12"
            name="sector"
            defaultValue=""
            required
          >
            <option value="" disabled>
              {f.sectorPlaceholder}
            </option>
            {f.sectorOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            aria-hidden
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </Field>

      <button type="submit" className="btn btn-primary mt-2 w-full">
        {t.submit}
      </button>
      <p className="mt-1 text-[11px] leading-relaxed text-faint">{t.note}</p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}
