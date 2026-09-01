"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/ui/container";
import { SectionIntro } from "@/components/ui/section-intro";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/content/site";
import type { Dictionary } from "@/content/dictionary";
import { cn } from "@/lib/utils";

export function Contact({ copy }: { copy: Dictionary["contact"] }) {
  return (
    <Section id="contact" labelledBy="contact-title" className="section-y">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionIntro
              titleId="contact-title"
              index="06"
              eyebrow={copy.eyebrow}
              title={copy.title}
              lead={copy.lead}
            />

            <div data-reveal="up" className="mt-12">
              <p className="eyebrow text-ink-mute">{copy.emailLabel}</p>
              <div className="mt-3.5 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-underline text-lg font-medium text-ink sm:text-xl"
                >
                  {siteConfig.email}
                </a>
                <CopyEmail copy={copy} />
              </div>
            </div>

            <div data-reveal="up" data-rd="1" className="mt-10">
              <p className="eyebrow text-ink-mute">{copy.elsewhereLabel}</p>
              <SocialLinks className="mt-3.5" />
            </div>

            <p
              data-reveal="up"
              data-rd="2"
              className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-line bg-paper-raised px-4 py-2 text-xs text-ink-soft"
            >
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red" />
              </span>
              {copy.availability}
            </p>
          </div>

          <ContactForm copy={copy} />
        </div>
      </Container>
    </Section>
  );
}

function CopyEmail({ copy }: { copy: Dictionary["contact"] }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
    } catch {
      return;
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className="inline-flex items-center gap-2.5">
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? copy.emailCopied : copy.copyEmail}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200",
          copied
            ? "border-red bg-red text-paper"
            : "border-line text-ink-soft hover:border-ink hover:bg-ink hover:text-paper",
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      <span
        aria-live="polite"
        className={cn(
          "meta text-red-deep transition-opacity duration-300",
          copied ? "opacity-100" : "opacity-0",
        )}
      >
        {copied ? copy.emailCopied : ""}
      </span>
    </span>
  );
}

function Field({
  label,
  children,
  htmlFor,
  focused,
}: {
  label: string;
  children: React.ReactNode;
  htmlFor: string;
  focused: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={cn(
          "eyebrow flex items-center gap-2 transition-colors duration-200",
          focused ? "text-ink" : "text-ink-mute",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "h-1 w-1 rounded-full bg-red transition-opacity duration-200",
            focused ? "opacity-100" : "opacity-0",
          )}
        />
        {label}
      </label>
      <div className="relative mt-2">
        {children}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-line"
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 bottom-0 h-[1.5px] origin-left bg-red transition-transform duration-[420ms] ease-[var(--ease-spatial)]",
            focused ? "scale-x-100" : "scale-x-0",
          )}
        />
      </div>
    </div>
  );
}

const fieldClassName =
  "w-full bg-transparent py-2.5 text-[15px] text-ink outline-none placeholder:text-ink-mute/70";

function ContactForm({ copy }: { copy: Dictionary["contact"] }) {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `${copy.form.subject} ${name}`;
    const body = `${message}\n\n— ${name}\n${email}`;

    setSent(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setSent(false), 3000);

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const focusProps = (key: string) => ({
    onFocus: () => setFocused(key),
    onBlur: () => setFocused((current) => (current === key ? null : current)),
  });

  return (
    <form
      onSubmit={onSubmit}
      data-reveal="up"
      data-rd="1"
      className="relative overflow-hidden rounded-card border border-line bg-paper-raised p-6 sm:p-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-red via-red/25 to-transparent"
      />

      <div className="space-y-7">
        <Field
          label={copy.form.name}
          htmlFor={`${id}-name`}
          focused={focused === "name"}
        >
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={copy.form.namePlaceholder}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClassName}
            {...focusProps("name")}
          />
        </Field>

        <Field
          label={copy.form.email}
          htmlFor={`${id}-email`}
          focused={focused === "email"}
        >
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={copy.form.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClassName}
            {...focusProps("email")}
          />
        </Field>

        <Field
          label={copy.form.message}
          htmlFor={`${id}-message`}
          focused={focused === "message"}
        >
          <textarea
            id={`${id}-message`}
            name="message"
            required
            rows={5}
            placeholder={copy.form.messagePlaceholder}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={cn(fieldClassName, "resize-none")}
            {...focusProps("message")}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="group relative mt-9 flex h-13 w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-ink text-[15px] font-medium text-paper active:translate-y-px"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 bg-red transition-transform duration-[520ms] ease-[var(--ease-spatial)] group-hover:scale-x-100"
        />
        <span className="relative">{sent ? copy.form.opening : copy.form.submit}</span>
        <ArrowRight
          aria-hidden="true"
          className="relative h-4 w-4 transition-transform duration-300 ease-[var(--ease-spatial)] group-hover:translate-x-1"
        />
      </button>

      <p className="mt-3.5 text-center text-xs leading-relaxed text-ink-mute">
        {copy.form.note}
      </p>
    </form>
  );
}
