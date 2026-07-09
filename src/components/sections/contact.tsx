"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Copy } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SocialLinks } from "@/components/ui/social-links";
import { Reveal } from "@/components/animations/reveal";

export function Contact() {
  return (
    <Section id="contact" className="overflow-hidden py-28 sm:py-36 lg:py-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-[-20rem] left-1/2 h-[36rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[160px]" />
      </div>

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <SectionHeading
              titleId="contact-title"
              eyebrow="07 — Contact"
              title={
                <>
                  Let&apos;s build something{" "}
                  <span className="font-serif font-normal italic">
                    worth remembering.
                  </span>
                </>
              }
              lead="A product, a platform, or an idea that needs proper engineering — tell me about it. I read and answer every message."
            />

            <Reveal delay={0.2}>
              <div className="mt-12">
                <p className="font-mono text-[11px] tracking-[0.3em] text-faint uppercase">
                  Email
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <a
                    href={`mailto:${siteConfig.author.email}`}
                    className="group relative text-xl font-medium text-foreground transition-colors hover:text-white sm:text-2xl"
                  >
                    {siteConfig.author.email}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full"
                    />
                  </a>
                  <CopyEmailButton email={siteConfig.author.email} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-10">
                <p className="font-mono text-[11px] tracking-[0.3em] text-faint uppercase">
                  Elsewhere
                </p>
                <SocialLinks className="mt-4" />
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="mt-12 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5">
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  {siteConfig.author.availability} · Based in{" "}
                  {siteConfig.author.location}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:mt-2">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy email address"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors duration-300 hover:border-white/25 hover:text-foreground"
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}

const inputClassName =
  "mt-2 w-full border-b border-white/[0.12] bg-transparent py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-faint focus:border-accent";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Project inquiry from ${name}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${siteConfig.author.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-sm sm:p-9"
    >
      <div className="space-y-7">
        <div>
          <label
            htmlFor="contact-name"
            className="font-mono text-[10px] tracking-[0.3em] text-faint uppercase"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="font-mono text-[10px] tracking-[0.3em] text-faint uppercase"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="font-mono text-[10px] tracking-[0.3em] text-faint uppercase"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="What are we building?"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={`${inputClassName} resize-none`}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-9 w-full">
        Send message
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Button>
      <p className="mt-4 text-center text-[11px] leading-relaxed text-faint">
        Opens your email client — nothing is stored or tracked.
      </p>
    </form>
  );
}
