import {
  Cpu,
  Database,
  Globe,
  MonitorSmartphone,
  Radio,
  Server,
} from "lucide-react";
import { SpykeMark } from "@/components/brand/spyke-logo";
import { cn } from "@/lib/utils";

const stepIcons = [Globe, Server, Radio, Cpu, Database, MonitorSmartphone];

interface SystemDiagramProps {
  label: string;
  steps: string[];
  className?: string;
}

/**
 * Stand-in composition for products with no screenshot: the system drawn as a
 * hairline matrix rather than a picture of one.
 */
export function SystemDiagram({ label, steps, className }: SystemDiagramProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border border-line-invert bg-[#141210]",
        className,
      )}
    >
      <div aria-hidden="true" className="blueprint absolute inset-0" />
      <div className="pointer-events-none absolute -right-6 -bottom-8 h-40 opacity-[0.07] sm:h-56">
        <SpykeMark sizes="180px" />
      </div>

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-line-invert-soft px-5 py-4 sm:px-6">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-red"
          />
          <p className="eyebrow text-paper/55">{label}</p>
        </div>

        <ol className="grid flex-1 auto-rows-fr grid-cols-1 gap-px bg-line-invert-soft sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length];

            return (
              <li
                key={step}
                className="group/node flex flex-col justify-between gap-6 bg-[#141210] p-5 transition-colors duration-300 hover:bg-[#191614] sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-red">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-paper/30 transition-colors duration-300 group-hover/node:text-paper/70"
                  />
                </div>
                <p className="font-mono text-[12px] leading-snug text-paper/80 sm:text-[13px]">
                  {step}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
