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
        "@container relative flex flex-col overflow-hidden rounded-xl border border-line-invert bg-[#141210]",
        className,
      )}
    >
      <div aria-hidden="true" className="blueprint absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-6 -bottom-8 h-40 opacity-[0.07] @2xl:h-56">
        <SpykeMark sizes="180px" />
      </div>

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center gap-3 border-b border-line-invert-soft px-4 py-3 @2xl:px-6 @2xl:py-4">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-red"
          />
          <p className="eyebrow text-paper/55">{label}</p>
        </div>

        <ol className="grid flex-1 auto-rows-fr grid-cols-2 gap-px bg-line-invert-soft @xl:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = stepIcons[index % stepIcons.length];

            return (
              <li
                key={step}
                className="flex flex-col justify-between gap-4 bg-[#141210] p-4 @2xl:gap-6 @2xl:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-red">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-paper/35"
                  />
                </div>
                <p className="font-mono text-[11px] leading-snug text-paper/80 @2xl:text-[13px]">
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
