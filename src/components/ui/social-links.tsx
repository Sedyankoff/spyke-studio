import { Globe, Mail } from "lucide-react";
import { socialLinks } from "@/content/site";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import type { SocialPlatform } from "@/content/schema";

const platformIcons: Record<
  SocialPlatform,
  React.ComponentType<{ className?: string }>
> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  portfolio: Globe,
  email: Mail,
};

export function SocialLinks({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socialLinks.map((link) => {
        if (!link.href) return null;
        const Icon = platformIcons[link.platform];
        const isExternal = link.platform !== "email";

        return (
          <li key={link.platform}>
            <a
              href={link.href}
              aria-label={link.label}
              {...(isExternal && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-[color,background-color,border-color,transform] duration-200 ease-[var(--ease-spatial)] hover:-translate-y-0.5",
                tone === "ink"
                  ? "border-line text-ink-soft hover:border-ink hover:bg-ink hover:text-paper"
                  : "border-line-invert text-paper/70 hover:border-paper hover:bg-paper hover:text-ink",
              )}
            >
              <Icon className="h-[17px] w-[17px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
