"use client";

import { Mail } from "lucide-react";
import { socialLinks } from "@/constants/site";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/icons";
import type { SocialPlatform } from "@/types";

const platformIcons: Record<
  SocialPlatform,
  React.ComponentType<{ className?: string }>
> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  email: Mail,
};

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {socialLinks.map((link) => {
        const Icon = platformIcons[link.platform];
        const isExternal = link.platform !== "email";

        return (
          <li key={link.platform}>
            <Magnetic strength={0.35}>
              <a
                href={link.href}
                aria-label={link.label}
                {...(isExternal && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors duration-300 hover:border-white/25 hover:text-foreground"
              >
                <Icon className="h-[17px] w-[17px]" />
              </a>
            </Magnetic>
          </li>
        );
      })}
    </ul>
  );
}
